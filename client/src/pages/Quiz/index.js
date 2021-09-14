import {useState, useEffect} from "react"
import {useQuery, useMutation} from "@apollo/client"
import {useParams} from "react-router-dom"

import { GET_QUIZ } from "../../utils/queries"

export default function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState({})

    const [answers, setAnswers] = useState([])

    const {id} = useParams()
    
    const {loading, data, error} = useQuery(GET_QUIZ, {
        variables: {quizId: id}
    })

    useEffect(() => {
        setCurrentQuestion(data ? data.quiz.questions[0] : {})
    }, [data])

    function nextQuestion() {
        if(currentQuestion.index < data.quiz.questions.length) {
            const nextQuestion = data.quiz.questions[currentQuestion.index]
            setCurrentQuestion(nextQuestion)
        }
    }

    function prevQuestion() {
        if(currentQuestion.index > 1) {
            const newIndex = (currentQuestion.index - 1)
            const prevQuestion = data.quiz.questions[newIndex - 1]
            setCurrentQuestion(prevQuestion)
        }
    }



    if(loading) {
        return(
            <div>
                <span>Loading...</span>
            </div>
        )
    }

    if(error) {
        return(
            <div className='min-h-screen items-center justify-center flex bg-theme-lighter'>
                <div className="p-10 rounded bg-red-400">
                    <span className="text-3xl font-bold">Quiz ID not Found</span>
                </div>
            </div>
        )
    }



    return(
        <div className='min-h-screen justify-center flex bg-theme-lighter'>
            <div className="rounded mt-20 w-full shadow-lg p-5 bg-theme-bluegray mx-1 md:mx-0 md:w-10/12">
                <h3 className="text-3xl text-white font-main">{data.quiz.title}</h3>
                <span>Created By: {data.quiz.author}</span>
                <div className="w-full p-3 container rounded bg-theme-lighter">
                  <span>{currentQuestion.questionText}</span>
                  <div className="items-center justify-center flex space-x-5">
                    <button className="p-2 rounded bg-theme-darker" onClick={() => nextQuestion()}>Next Question</button>
                    <button className="p-2 rounded bg-theme-darker" onClick={() => prevQuestion()}>Back</button>
                  </div>
                </div>
            </div>

        </div>
    )
}