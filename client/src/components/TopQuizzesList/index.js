import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_TOP_QUIZZES } from '../../utils/queries';

export default function TopQuizzesList() {
  const renderData = (data) => {
    return (
      <>
        {data.map((quiz, i) => {
          return (
            <Link to={`/quiz/${quiz._id}`} key={i}>
              <div className="flex justify-between p-1 text-base flex-wrap font-normal container rounded bg-theme-berry hover:bg-theme-darkberry hover:shadow-sm transition duration-200">
                <span>{quiz.title}</span>
                <span>by: {quiz.author}</span>
                <div>
                  <span><FontAwesomeIcon icon={faChevronRight} /></span>
                </div>
              </div>
            </Link>
          )
        })}
      </>
    )
  };
    const {loading, data, error, stopPolling} = useQuery(GET_TOP_QUIZZES, {
      pollInterval: 1000
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
  
    const pages = [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let topQuizzesData = data?.topQuizzes || [];

    for (let i = 0; i < Math.ceil(topQuizzesData.length/itemsPerPage); i++) {
      pages.push(i + 1);
    };

    const currentItems = topQuizzesData.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
      return (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
          </div>
      )
    };
    
    if(error) {
      return(
        <span>Error :/</span>
      )
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
  
    function handleClick(event) {
      setCurrentPage(Number(event.target.id));
    };
  
    function handlePrevBtn() {
      setCurrentPage(currentPage - 1);
    };
  
    function handleNextBtn() {
      setCurrentPage(currentPage + 1);
    };

    setTimeout(() => {
      stopPolling()
    }, 120000)
  
    return (
      <div className="space-y-4 text-sm md:text-lg">
        <h1 className='font-semibold text-lg'>Top Quizzes</h1>
        {topQuizzesData.length ? (
          <div className="container flex flex-col space-y-2">
            {renderData(currentItems)}
            <ul className='flex justify-center flex-wrap list-none'>
              <li key='prevbtn' className='p-1'>
                <button
                  onClick={handlePrevBtn}
                  disabled={currentPage == pages[0] ? true : false}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </li>
              {topQuizzesData.length > 8 ? renderPageNumbers : null}
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
        )
        : null}
      </div>
    )}