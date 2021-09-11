const { AuthenticationError } = require('apollo-server-express');
const {User, Quiz} = require("../models")
const { signToken } = require('../utils/auth');

const mongoose = require('mongoose');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({}).populate('quizzes')
        },

        user: async (parent, {userId}) => {
          return User.findOne({_id: userId}).populate('quizzes')
        },

        quizzes: async () => {
          return Quiz.find({});
        },

        quiz: async (parent, {quizId}) => {
          return Quiz.findOne({_id: quizId})
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

        createQuiz: async (parent, {input}, context) => {
          if(context.user) {
            console.log(context.user)
            const quiz = await Quiz.create({...input, author: context.user.username});
            const author = await User.findOneAndUpdate({_id: context.user._id},
                { $addToSet: { quizzes: quiz._id}})
            return quiz
            }
            throw new AuthenticationError('You need to be logged in!');
          }
    }
}

module.exports = resolvers;