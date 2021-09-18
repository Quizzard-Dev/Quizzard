const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const quizSchema = new Schema({
    title: {
        type: String,
        required: "You need a title!",
        unique: false,
        minlength: 1,
        maxlength: 30
    },
    description: {
        type: String,
        required: "Description is required!",
        minlength: 10,
        maxlength: 300
    },
    author: {
        type: String,
        required: true
    },
    takers: {
        type: Number,
        default: 0
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
    ],
    scores: [
        {
            username: {
                type: String
            },
            percent: {
                type: Number
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    tags: [{
        type: String
    }]
})

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;