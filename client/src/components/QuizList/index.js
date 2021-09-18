import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faChevronLeft, 
  faChevronRight, 
  faEdit 
} from '@fortawesome/free-solid-svg-icons';

import { DELETE_QUIZ } from "../../utils/mutations";
import { GET_QUIZZES } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function QuizList() {
  const renderData = (data) => {
    return (
      <>
        {data.map((quiz, i) => {
          return (
            <div key={i} className="flex justify-between container rounded bg-theme-main hover:bg-theme-darkest hover:shadow-sm transition duration-200 px-2 py-1">
              <Link to={`/quiz/${quiz._id}`}>
                <div className='w-auto font-semibold'>
                  <span>{quiz.title}</span>
                </div>
              </Link>
              <div className="px-1 space-x-3">
                <Link to='/creator'>
                  <span onClick={() => handleQuizEdit(quiz)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                </Link>
                <span className='cursor-pointer' onClick={(e) => handleQuizDelete(quiz, e)}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  const [deleteQuiz] = useMutation(DELETE_QUIZ);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [redirect, setRedirect] = useState("");

  const pages = [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const { loading, data, refetch } = useQuery(GET_QUIZZES, {
    variables: { 
      author: Auth.getProfile().data.username,
    },
    fetchPolicy: "cache-and-network"
  });
  
  let quizData = data?.quizzes || [];
  
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

  function handleQuizEdit(quiz) {
    localStorage.setItem('quiz', JSON.stringify(quiz));
    setRedirect(true);
  };

  async function handleQuizDelete(quiz, e) {
    e.stopPropagation();
    e.preventDefault();
    const { data } = await deleteQuiz({
      variables: { quizId: quiz._id }
    });
    if(data) {
      refetch()
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
        </div>
    )
  }
  
  if (redirect) {
    return <Redirect to="/creator" />;
  };

  return (
    <div>
      <h2 className="text-lg mb-5 font-semibold">Your Quizzes</h2>
      {quizData.length
        ? (<div>
          <span>{`You have ${quizData.length} Saved Quizzes`}</span>
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
        : <p className='italic'>You have no saved quizzes...</p>}
    </div>
  )
};
