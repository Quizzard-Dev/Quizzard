import {useQuery} from "@apollo/client"
import {useState} from 'react'
import {GET_USER} from "../../utils/queries"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, 
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

export default function UserPage() {

    const renderData = (data) => {
        return (
            <>
                {data.map((quiz, i) => {
                    return (
                        <Link to={`/quiz/${quiz._id}`}>
                            <div key={i} className="flex justify-between container rounded bg-theme-main hover:bg-theme-darkest hover:shadow-sm transition duration-200 px-2 py-1">
                                <div className='w-auto font-semibold'>
                                    <span>{quiz.title}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </>
        )
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const pages = [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const {id} = useParams();

    const {data, loading, error} = useQuery(GET_USER, {
        variables: {
            userId: id
        }
    })

    let quizData = data?.user?.quizzes || [];
  
    for (let i = 0; i < Math.ceil(quizData.length/itemsPerPage); i++) {
      pages.push(i + 1);
    };
  
    const currentItems = quizData.slice(indexOfFirstItem, indexOfLastItem);
  
    const renderPageNumbers = pages.map(n => {
      return (
        <div className='cursor-pointer'>
          <li 
            className={currentPage == n ? 'bg-theme-darker rounded' : 'null'}
            style={{
              padding: '0.25rem'
            }}
            key={n} 
            id={n}
            onClick={handleClick}
          >
            {n}
          </li>
        </div>
      );
    });
  
    
    function handleClick(event) {
      setCurrentPage(Number(event.target.id));
    };
    
    function handlePrevBtn() {
      setCurrentPage(currentPage - 1);
    };
    
    function handleNextBtn() {
      setCurrentPage(currentPage + 1);
    };

    if (loading) {
        return (
          <div className='min-h-screen items-center justify-center flex '>
            <div className=" flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
            </div>
          </div>
        );
      };
    
      if (error) {
        return (
          <div className='min-h-screen items-center justify-center flex '>
            <div className="p-10 rounded bg-red-400">
              <span className="text-3xl font-bold">User ID not Found</span>
            </div>
          </div>
        );
      };

    return (
        <div className='min-h-screen flex justify-center items-center '>
            <div className='mx-auto w-full md:w-2/3 bg-theme-bluegray rounded p-3'>
                <div className='items-center justify-between flex'>
                    <h2 className="text-3xl">User: <span className="text-white">{data.user.username}</span></h2>
                    <h2 className="text-3xl">Quizzes: <span className="text-white">{data.user.quizzes.length}</span></h2>
                    <h2 className="text-3xl">Taken: <span className="text-white">{data.user.quizzesTaken}</span></h2>
                </div>
                <div className="py-3">
                    {quizData.length
                        ? (<div>
                            <span>{`User has ${quizData.length} Saved Quizzes`}</span>
                            <div className="mt-5 flex flex-col space-y-2 container">
                                {renderData(currentItems)}
                                <div className='flex justify-center items-center'>
                                    <ul className='flex flex-wrap list-none'>
                                        <li key='prevbtn' className='p-1'>
                                            <button
                                                onClick={handlePrevBtn}
                                                disabled={currentPage == pages[0] ? true : false}
                                            >
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                        </li>
                                        {quizData.length > 6 ? renderPageNumbers : null}
                                        <li key='nextbtn' className='p-1'>
                                            <button
                                                onClick={handleNextBtn}
                                                disabled={currentPage == pages[pages.length - 1] ? true : false}
                                            >
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>)
                        : <p className='italic'>User has no saved quizzes...</p>}
                </div>
                <div className="py-5">
                    {data.user.recentlyTaken.length ?
                        <div>
                        <div className="pb-3">
                            <span>{`Recently Taken`}</span>
                        </div>
                            {data.user.recentlyTaken.map(quiz => {
                                return (
                                    <div className="my-2">
                                        <Link to={`/quiz/${quiz._id}`}>
                                            <div className="bg-theme-berry hover:bg-theme-berrydark transition duration-200 flex justify-between rounded p-1">
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
            </div>
        </div>
    )
}