import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { SEARCH_QUIZZES } from '../../utils/queries';
import Auth from '../../utils/auth';
import QuizList from '../../components/QuizList';

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState('');

  // const { loading, data, error } = useQuery(SEARCH_QUIZZES);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  }

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSearchSubmit();
    }
  };

  let token = localStorage.getItem('id_token');
  
  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-theme-lighter'>
      <div className='h-auto md:h-eightyvh m-2 md:m-5 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4'>
        <div className='text-center h-full space-y-4 mt-20 md:mt-0 mb-14'>
          <form className='h-10 md:h-ten'>
            <input 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              type='text'
              className='w-full bg-theme-aliceblue placeholder-gray-400 placeholder-opacity-70 p-3 rounded'
              placeholder='Search for topics!'
            />
          </form>
          <div className='h-2/3 md:h-ninety p-5 bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
            Top Quizzes
          </div>
        </div>
        <div className='flex flex-wrap space-y-0 md:space-y-4 text-center'>
          <div className='h-ten w-full mt-12 md:mt-0 grid grid-flow-col grid-cols-2 gap-3'>
            <Link to='/creator'>
              <button className='w-full p-1 md:p-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                <p>
                  Create a quiz
                </p>
              </button>
            </Link>
            <Link to='/' onClick={Auth.logout}>
              <button className='w-full p-1 md:p-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                <p>
                  Log out
                </p>
              </button>
            </Link>
            <Link to='/'>
              <button className='w-full p-1 md:p-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                  <p>
                    Third button
                  </p>
              </button>
            </Link>
            <Link to='/'>
              <button className='w-full p-1 md:p-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                <p>
                  Fourth button
                </p>
              </button>
            </Link>
          </div>
          <div className='hidden md:grid h-ninety p-5 flex-grow bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
            Top Categories
          </div>
        </div>
        <div className='text-center space-y-4'>
          <QuizList />
          <div className='hidden md:grid h-1/2 p-5 bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
            Top Users
          </div>
        </div>
      </div>
    </div>
  )
}
