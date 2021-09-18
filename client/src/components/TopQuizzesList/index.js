import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_TOP_QUIZZES } from '../../utils/queries';

export default function TopQuizzesList() {
    const {loading, data, error, stopPolling} = useQuery(GET_TOP_QUIZZES, {
      pollInterval: 1000
    })

    if (loading) {
      return (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
          </div>
      )
    }
  
    if(error) {
      return(
        <span>Error</span>
      )
    }

    setTimeout(() => {
      stopPolling()
    }, 120000)
  
    return (
      <div className="space-y-1">
        {data.topQuizzes ? data.topQuizzes.map(quiz => {
          return (
            <Link to={`/quiz/${quiz._id}`}>
            <div className="bg-theme-berry my-2 hover:shadow-md hover:bg-theme-berrydark transition duration-200 p-1 text-base flex-wrap font-normal flex justify-between rounded">
              <span>{quiz.title}</span>
              <span>{quiz.takers} takers</span>
              <span>by: {quiz.author}</span>
            </div>
            </Link>
          )
        }) : null}
      </div>
    )}