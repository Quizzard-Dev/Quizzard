import { useQuery } from '@apollo/client';
import {Link} from "react-router-dom"
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
            <div>
            <Link to={`/user/${user._id}`}>
            <div className="bg-theme-berry hover:bg-theme-berrydark transition duration-200 p-1 overflow-x-auto text-base flex-wrap font-normal flex justify-between rounded">
              <div className="w-2/6">
                <span>{user.username}</span>
              </div>
              <div className="w-2/6">
                <span>Quizzes: {user.quizzes.length}</span>
              </div>
              <div className="w-2/6">
                <span>Taken: {user.quizzesTaken}</span>
              </div>
            </div>
            </Link>
            </div>
          )
        }) : null}
      </div>
    )}