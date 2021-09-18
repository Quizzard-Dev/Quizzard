const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require("../models")
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('quizzes')
    },

    topUsers: async () => {
      const userList = await User.find({}).sort({quizzesTaken: -1}).limit(10)
      return userList
    },

    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId }).populate('quizzes');
    },

    topQuizzes: async () => {
      const quizList = await Quiz.find().sort({takers: -1}).limit(20)
      return quizList
    },

    quizzes: async (parent, { author }) => {
      const quizData = await Quiz.find({
        author: author,
      });
      return quizData;
    },

    quiz: async (parent, { quizId }) => {
      return await Quiz.findOne({ _id: quizId })
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate([{
        path: 'quizzes',
        model: 'Quiz'
      },
    {
      path: 'recentlyTaken',
      model: 'Quiz'
    }]);
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
    },

    deepSearch: async (parent, { input }) => {
      const {title, author, tags} = input
      let query = {}
      if(title) {
        query.title = {$regex: title, $options: 'i'}
      }
      if(author) {
        query.author = {$regex: author, $options: 'i'}
      }
      if(tags) {
        if(tags.length) {
          query.tags = {$all: tags}
        }
      }
      const results = await Quiz.find(query).lean();
      return results;
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
        await User.findOneAndUpdate({ _id: context.user._id },
          { $addToSet: { quizzes: quiz._id } })
        return quiz
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteQuiz: async (parent, { quizId }, context) => {
      if (context.user) {
        const quiz = await Quiz.findOne({ _id: quizId })
        if (context.user.username === quiz.author) {
          const user = await User.findOne({_id: context.user._id})
          const quizIndex = user.quizzes.indexOf(quizId)
          user.quizzes.splice(quizIndex, 1)
          await user.save()
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
        const user = await User.findOne({_id: context.user._id})
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
          user.quizzesTaken ++;
          quiz.takers ++;
        }
        const usersRecentScores = user.recentlyTaken
        if(user.recentlyTaken.length) {
          const delIndex = usersRecentScores.indexOf(quizId)
          if(delIndex != -1) {
            usersRecentScores.splice(delIndex, 1)
          }
        }
        usersRecentScores.unshift(quizId)
        user.recentlyTaken = usersRecentScores
        quiz.scores.unshift({username: context.user.username, percent: (numCorrect / correctAnswers.length)})
        if(quiz.scores.length > 10) {
          quiz.scores.length = 10
        }
        await quiz.save()
        await user.save()
        return ({percentage: (numCorrect / correctAnswers.length), results: grades})
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
