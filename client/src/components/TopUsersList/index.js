import { useQuery } from '@apollo/client';
import { GET_TOP_USERS } from '../../utils/queries';

export default function TopUsersList() {
    const {loading, data, error, stopPolling} = useQuery(GET_TOP_USERS, {
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
        {data.topUsers ? data.topUsers.map(user => {
          return (
            <div className="bg-theme-berry p-1 text-base flex-wrap font-normal flex justify-between rounded">
              <div className="w-2/6 overflow-x-auto">
                <span>{user.username}</span>
              </div>
              <div className="w-2/6">
                <span>Quizzes: {user.quizzes.length}</span>
              </div>
              <div className="w-2/6">
                <span>Taken: {user.quizzesTaken}</span>
              </div>
            </div>
          )
        }) : null}
      </div>
    )}