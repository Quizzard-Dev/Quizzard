import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { DELETE_QUIZ } from "../../utils/mutations";
import { GET_QUIZZES } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function QuizList() {
  const renderData = (data) => {
    return (
      <>
        {data.map((quiz, i) => {
          return (
            <Link key={i} to={`/quiz/${quiz._id}`}>
              <div className="flex justify-between container rounded bg-theme-darkerer hover:bg-theme-darkest hover:shadow-sm transition duration-200 px-2 py-1">
                <span>{quiz.title}</span>
                <div className="px-1" onClick={(e) => handleQuizDelete(quiz, e)}>
                  <span><FontAwesomeIcon icon={faTimes} /></span>
                </div>
              </div>
            </Link>
          )
        })}
      </>
    )
  }

  const [deleteQuiz] = useMutation(DELETE_QUIZ);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [redirect, setRedirect] = useState("");
  const [currentPageItems, setCurrentPageItems] = useState([]);

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
  
  if (loading) {
    return (
      <div className="h-auto overflow-y-auto md:h-1/2 p-5 bg-theme-bluegray text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
        <h2 className="text-xl font-bold">Loading</h2>
      </div>
    );
  };

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

  function handleQuizEdit(quiz) {
    localStorage.setItem('quiz', JSON.stringify(quiz));
    setRedirect(true);
  };

  function handleClick(event) {
    setCurrentPage(Number(event.target.id));
  };

  function handlePrevBtn() {
    setCurrentPage(currentPage - 1);
  };

  function handleNextBtn() {
    setCurrentPage(currentPage + 1);
  }

  async function handleQuizDelete(quiz, e) {
    e.stopPropagation();
    e.preventDefault();
    const { data } = await deleteQuiz({
      variables: { quizId: quiz._id }
    });
    if (data) {
      refetch();
    };
  };

  if (redirect) {
    return <Redirect to="/creator" />;
  };

  return (
    <div className="h-auto overflow-y-auto md:h-1/2 p-5 bg-theme-bluegray text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
      <h2 className="text-lg mb-5 font-semibold">Your Quizzes</h2>
      {quizData.length
        ? (<div>
          <span>{`You have ${quizData.length} Saved Quizzes`}</span>
          <div className="mt-5 flex flex-col space-y-3 container">
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
                {quizData.length > 10 ? renderPageNumbers : null}
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
        : `You have no Saved Quizzes`}
    </div>
  )
};
