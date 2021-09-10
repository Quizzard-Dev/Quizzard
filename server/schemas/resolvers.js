const {User, Quiz} = require("../models")

const resolvers = {
    Query: {
        users: async () => {
            return User.find({}).populate('quizzes')
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            return user;
          },
    }
}

module.exports = resolvers;