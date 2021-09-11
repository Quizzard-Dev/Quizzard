import {useQuery} from "@apollo/client"
import { GET_ME } from "../../utils/queries"

export default function QuizList() {

    const {loading, data} = useQuery(GET_ME)

    let quizData = data?.me.quizzes || {}

    if(loading) {
        return(
            <h2 className="text-xl font-bold">Loading</h2>
        )
    }

    function handleQuizEdit(quiz) {
        localStorage.setItem('quiz', JSON.stringify(quiz))
        window.location.assign("http://localhost:3000/creator")
    }
    
    return (
        <div className="mx-auto container bg-yellow-200 rounded p-3">
            <h2 className="text-lg mb-5 font-semibold">Quiz List</h2>
            {quizData.length
            ? (<div>
                <span>{`You have ${quizData.length} Saved Quizzes`}</span>
                <div className="flex flex-col space-y-3 container">
                {quizData.map((quiz) => {
                    return (
                        <div onClick={() => handleQuizEdit(quiz)} className="container rounded bg-red-500 px-2 py-1">
                            <span>{quiz.title}</span>
                        </div>
                    )
                })}
                </div>
            </div>)
            : `You have No Saved Quizzes`}
        </div>
    )
}