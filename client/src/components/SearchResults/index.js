import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { SEARCH_QUIZZES } from '../../utils/queries';

export default function SearchResults({ input }) {
  const renderData = (data) => {
    return (
      <>
        {data.map((quiz, i) => {
          return (
            <Link to={`/quiz/${quiz._id}`} key={i}>
              <div className="flex justify-between text-base container rounded bg-theme-main hover:bg-theme-darkest hover:shadow-sm transition duration-200 px-2 py-1">
                <span>{quiz.title}</span>
                <span>{quiz.author}</span>
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const pages = [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const { loading, data, error } = useQuery(SEARCH_QUIZZES, {
    variables: { search: input }
  });

  let searchData = data?.searchQuizzes || [];
  
  for (let i = 0; i < Math.ceil(searchData.length/itemsPerPage); i++) {
    pages.push(i + 1);
  };

  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className='h-auto md:h-ninety p-5 justify-center flex items-center overflow-y-auto bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
        </div>
      </div>
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

  return (
    <div className='h-auto shadow-2xl md:h-ninety p-5 bg-theme-bluegray text-sm md:text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
      {searchData.length 
      ? (
        <div className='space-y-4'>
          <span className='italic'>{`Search Results for '${input}'`}</span>
          <div className='flex flex-col font-normal space-y-2 container'>
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
                {searchData.length > 8 ? renderPageNumbers : null}
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
        </div>
      )
    : `No results for that search!`}
    </div>
  )
}
