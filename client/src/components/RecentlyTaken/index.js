import { useQuery } from "@apollo/client"
import { GET_ME } from "../../utils/queries"
import { Link } from "react-router-dom"

export default function RecentlyTaken() {
    const { data, loading, error } = useQuery(GET_ME)

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
            </div>
        )
    }

    if (error) {
        return (
            <span>Error</span>
        )
    }

    return (
        <div>
            {data.me.recentlyTaken.length ?
                <div>
                    {data.me.recentlyTaken.map(quiz => {
                        return (
                            <div className="my-2">
                                <Link to={`/quiz/${quiz._id}`}>
                                    <div className="bg-theme-main hover:bg-theme-darkest transition duration-200 flex justify-between rounded p-1">
                                        <p>{quiz.title}</p>
                                        <p className="text-md font-normal">{quiz.author}</p>
                                    </div>
                                </Link>

                            </div>
                        )
                    })}
                </div>
                : <span className='italic font-normal'>No quizzes taken!</span>}
        </div>
    )
}