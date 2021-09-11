import {useQuery, useMutation} from "@apollo/client"
import {useState, useEffect} from 'react' 
import {Redirect} from "react-router"
import { DELETE_QUIZ } from "../../utils/mutations"
import { GET_ME } from "../../utils/queries"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function QuizList() {

    const [deleteQuiz] = useMutation(DELETE_QUIZ)

    const [redirect, setRedirect] = useState(false);

    const {loading, data, error, refetch} = useQuery(GET_ME)

    useEffect(() => {
        refetch()
    }, [data])

    let quizData = data?.me.quizzes || {}

    if(loading) {
        return(
            <h2 className="text-xl font-bold">Loading</h2>
        )
    }

    function handleQuizEdit(quiz) {
        localStorage.setItem('quiz', JSON.stringify(quiz))
        setRedirect(true)
    }

    async function handleQuizDelete(quiz, e) {
        e.stopPropagation()
        const { data } = await deleteQuiz({
            variables: {quizId: quiz._id}
        })
        if(data) {
            refetch()
        }
    }

    
    if(redirect) {
        return <Redirect to="/creator" />
    }

    return (
        <div className="mx-auto container bg-yellow-200 rounded p-3">
            <h2 className="text-lg mb-5 font-semibold">Quiz List</h2>
            {quizData.length
            ? (<div>
                <span>{`You have ${quizData.length} Saved Quizzes`}</span>
                <div className="mt-5 flex flex-col space-y-3 container">
                {quizData.map((quiz) => {
                    return (
                        <div onClick={() => handleQuizEdit(quiz)} className="flex justify-between container rounded bg-red-500 hover:bg-red-700 hover:shadow-sm transition duration-200 px-2 py-1">
                            <span>{quiz.title}</span>
                            <div className="px-1" onClick={(e) => handleQuizDelete(quiz, e)}>
                                <span><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>)
            : `You have No Saved Quizzes`}
        </div>
    )
}