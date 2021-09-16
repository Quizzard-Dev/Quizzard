const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require("../models")
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('quizzes')
    },

    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId }).populate('quizzes');
    },

    quizzes: async (parent, args) => {
      const quizData = await User.findOne({ _id: args.authorId }).populate('quizzes');
      return quizData.quizzes;
    },

    quiz: async (parent, { quizId }) => {
      return await Quiz.findOne({ _id: quizId })
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('quizzes')
      }
    },

    searchQuizzes: async (parent, { search }) => {
      let searchQuery = {};

      if (search) {
        searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } }
          ]
        };
      }

      const quizResults = await Quiz.find(searchQuery).lean();
      return quizResults;
    }

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    createQuiz: async (parent, { input }, context) => {
      if (context.user) {
        console.log(context.user)
        const quiz = await Quiz.create({ ...input, author: context.user.username });
        const author = await User.findOneAndUpdate({ _id: context.user._id },
          { $addToSet: { quizzes: quiz._id } })
        return quiz
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteQuiz: async (parent, { quizId }, context) => {
      if (context.user) {
        const quiz = await Quiz.findOne({ _id: quizId })
        if (context.user.username === quiz.author) {
          return await Quiz.findOneAndDelete({ _id: quizId });
        }
        throw new AuthenticationError('Incorrect credentials');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    submitQuiz: async (parent, {quizId, answers}, context) => {
      if(context.user) {
        let numCorrect = 0
        let grades = []
        const quiz = await Quiz.findOne({_id: quizId})
        const correctAnswers = []
        quiz.questions.forEach(question => {
          question.answers.forEach(answer => {
            if(answer.isCorrect) {
              correctAnswers.push({questionIndex: question.index, correctAnswer: answer.index})
            }
          })
        })
        answers.forEach(answer => {
          const question = correctAnswers.find(question => question.questionIndex === answer.questionIndex)
          if(question.correctAnswer === answer.chosenAnswer) {
            grades.push({questionIndex: answer.questionIndex, correct: true})
            numCorrect ++;
          }
          else {
            grades.push({questionIndex: answer.questionIndex, correct: false})
          }
        })
        const loadedScore = quiz.scores.find(score => score.username === context.user.username)
        if(loadedScore) {
          const delIndex = quiz.scores.indexOf(loadedScore)
          quiz.scores.splice(delIndex, 1)
        }
        else {
          const user = await User.findOne({_id: context.user._id})
          user.quizzesTaken ++;
          await user.save()
        }
        quiz.scores.unshift({username: context.user.username, percent: (numCorrect / correctAnswers.length)})
        if(quiz.scores.length > 10) {
          quiz.scores.length = 10
        }
        await quiz.save()
        return ({percentage: (numCorrect / correctAnswers.length), results: grades})
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
