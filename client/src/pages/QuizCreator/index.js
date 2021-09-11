import React, {useState, useEffect} from 'react'
import {useMutation} from '@apollo/client'
import { CREATE_QUIZ } from '../../utils/mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function QuizCreator() {
 
    const baseQuiz = {
        title: "",
        author: "",
        questions: []
    }
 
    const baseQuestion = {
        questionText: "",
        answers: [],
        index: 0
    }

    const baseAnswer = {
        answerText: "",
        isCorrect: false,
        index: 0
    }

    const [quiz, setQuiz] = useState(baseQuiz)

    const [currentQuestion, setCurrentQuestion] = useState({})
    const [currentAnswer, setCurrentAnswer] = useState({})

    function addQuestion() {
        const newQuestionList = quiz.questions
        const newQuestion = baseQuestion
        newQuestion.index = quiz.questions.length + 1
        newQuestionList.push(baseQuestion)
        setQuiz({...quiz, questions: newQuestionList})
        console.log(quiz)
    }

    function addAnswer() {
        const newAnswerList = currentQuestion.answers
        const newAnswer = baseAnswer
        newAnswer.index = currentQuestion.answers.length + 1
        newAnswerList.push(newAnswer)
        setCurrentQuestion({...currentQuestion, answers: newAnswerList})
    }

    function updateQuestion() {
        const newQuestionList = quiz.questions
        newQuestionList[currentQuestion.index - 1] = currentQuestion
        setQuiz({...quiz, questions: newQuestionList})
    }

    function updateAnswer() {
        const newAnswerList = currentQuestion.answers
        newAnswerList[currentAnswer.index - 1] = currentAnswer
        setCurrentQuestion({...currentQuestion, answers: newAnswerList})
    }

    function handleQuestionChange(question) {
        updateQuestion()
        setCurrentQuestion(question)
        setCurrentAnswer({});
    }

    function handleAnswerChange(answer) {
        updateAnswer()
        setCurrentAnswer(answer)
    }

   function handleQuestionDelete(question, e) {
       e.stopPropagation();
       if(question.index === currentQuestion.index) {
           setCurrentQuestion({})
           setCurrentAnswer({})
       }
        const newQuestionList = quiz.questions
        const delIndex = newQuestionList.indexOf(question)
        newQuestionList.splice(delIndex, 1)
        newQuestionList.forEach((question, index) => {
            question.index = (index + 1)
        })
        setQuiz({...quiz, questions: newQuestionList})
    }

   function handleAnswerDelete(answer, e) {
       e.stopPropagation();
       if(answer.index === currentAnswer.index) {
           setCurrentAnswer({})
       }
        const newAnswerList = currentQuestion.answers
        const delIndex = newAnswerList.indexOf(answer)
        newAnswerList.splice(delIndex, 1)
        newAnswerList.forEach((answer, index) => {
            answer.index = (index + 1)
        })
        setCurrentQuestion({...currentQuestion, answers: newAnswerList})
    }

    return (
        <div className="bg-blue-200 rounded shadow-lg p-5 m-3">
            <h1 className="text-xl font-bold text-center">Quiz Creator</h1>
            <form>
                <input type="text" value={quiz.title} placeholder="Title" onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
            </form>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-3">

            {/* Questions List */}

                <div className="bg-red-500 rounded-lg p-3">
                    <h2 className="text-lg font-bold mb-4">Question List</h2>
                    <div className="space-y-2 flex flex-col">
                        {quiz.questions.length ? quiz.questions.map((question) => {
                            return (
                                <div onClick={() => handleQuestionChange(question)} className={`flex flex-row justify-between container ${currentQuestion.index === question.index ? "bg-yellow-500 shadow-md" : "bg-yellow-200"} rounded p-2`} key={question.index}>
                                    <span><strong>Q{question.index}- </strong>{question.questionText}</span>
                                    <div onClick={(e) => handleQuestionDelete(question, e)} className="px-1">
                                         <span><FontAwesomeIcon icon={faTimes} /></span>
                                    </div>
                                </div>
                            )
                        }) : <p>Add questions by clicking the button below</p>}
                    </div>
                    <button className="mt-4 w-full rounded bg-green-500" onClick={() => addQuestion()}>Add Question</button>
                </div>

            {/* Question Editor */}

                <div className="bg-red-500 rounded-lg p-3">
                    <h2 className="text-lg font-bold mb-4">Question Editor</h2>
                    {currentQuestion.index ? (
                        <div>
                            <form>
                                <textarea className="w-full rounded p-1" type="text" value={currentQuestion.questionText} placeholder="Question" onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })} />
                            </form>

                        {/* Answers List */}

                            <div className="rounded container bg-green-200 p-2 mt-3">
                                <span className="font-semibold text-lg">Answers</span>
                                <div className="space-y-2">
                                {currentQuestion.answers.map((answer, index) => {
                                    return (
                                        <div onClick={() => handleAnswerChange(answer)} className={`flex flex-row justify-between container rounded ${currentAnswer.index === answer.index ? "bg-blue-500 shadow-md" : "bg-blue-300"} p-2`} key={index}>
                                            <span><strong>{answer.index}. </strong>{answer.answerText}</span>
                                            <div onClick={(e) => handleAnswerDelete(answer, e)} className="px-1">
                                         <span><FontAwesomeIcon icon={faTimes} /></span>
                                    </div>
                                        </div>
                                    )
                                })}
                                </div>
                                <button onClick={() => addAnswer()} className="mx-auto bg-green-600 rounded w-full mt-2">Add Answer</button>
                            </div>



                            <button className="mt-4 w-full rounded bg-blue-700" onClick={() => updateQuestion()}>Update Question</button>
                        </div>
                    ) : (
                        <p>Select a question to edit</p>
                    )}



                </div>



                <div className="bg-red-500 rounded-lg p-3">
                    <h2 className="text-lg font-bold mb-4">Answer Editor</h2>
                    {currentAnswer.index ? (
                        <div>
                        <form>
                                <textarea className="w-full rounded p-1" type="text" value={currentAnswer.answerText} placeholder="Answer" onChange={(e) => setCurrentAnswer({ ...currentAnswer, answerText: e.target.value })} />
                            </form>
                            <button className="mt-4 w-full rounded bg-blue-700" onClick={() => updateAnswer()}>Update Answer</button>
                        </div>
                    ) : (
                        <p>Select an answer to edit</p>
                    )}
                </div>
            </div>
        </div>
    )
}