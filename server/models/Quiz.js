const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const quizSchema = new Schema({
    title: {
        type: String,
        required: "You need a title!",
        minlength: 1,
        maxlength: 30
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    questions: [
        {
            questionText: {
                type: String,
                required: true
            },
            index: {
                type: Number
            },
            answers: [
                {
                    answerText: {
                        type: String,
                        required: true
                    },
                    index: {
                        type: Number
                    },
                    isCorrect: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ]
})

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;