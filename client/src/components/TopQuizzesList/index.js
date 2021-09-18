import { useQuery } from '@apollo/client';
import { GET_TOP_QUIZZES } from '../../utils/queries';

export default function TopQuizzesList() {
    const {loading, data, error, stopPolling} = useQuery(GET_TOP_QUIZZES, {
      pollInterval: 1000
    })

    if(loading) {
      return (
        <span>Loading...</span>
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
            <div className="bg-theme-berry p-1 text-base flex-wrap font-normal flex justify-between rounded">
              <span>{quiz.title}</span>
              <span>by: {quiz.author}</span>
            </div>
          )
        }) : null}
      </div>
    )}