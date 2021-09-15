import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { SEARCH_QUIZZES } from '../../utils/queries';

export default function SearchResults({ input }) {
  const { loading, data, error } = useQuery(SEARCH_QUIZZES, {
    variables: { search: input }
  });

  let searchData = data?.searchQuizzes || [];

  if (loading) {
    return(
      <div className="h-auto overflow-y-auto p-5 bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
        <h2 className="text-xl font-bold">Loading</h2>
      </div>
    )
  }

  return (
    <div className='h-2/3 md:h-ninety p-5 overflow-y-auto bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
      {searchData.length 
      ? (
        <div>
          <span className='italic'>{`Search Results for '${input}'`}</span>
          <div className='flex flex-col space-y-3 container'>
            {searchData.map((quiz) => {
              return(
                <Link to={`/quiz/${quiz._id}`}>
                <div className="flex justify-between container rounded bg-theme-darkerer hover:bg-theme-darkest hover:shadow-sm transition duration-200 px-2 py-1">
                  <span>{quiz.title}</span>
                  <span>{quiz.author}</span>
                  <div>
                    <span><FontAwesomeIcon icon={faChevronRight} /></span>
                  </div>
                </div>
                </Link>
              )
            })}
          </div>
        </div>
      )
    : `No results for that search!`}
    </div>
  )
}
