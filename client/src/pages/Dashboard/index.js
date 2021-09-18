import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import TopUsersList from '../../components/TopUsersList';
import TopQuizzesList from "../../components/TopQuizzesList"
import SearchResults from '../../components/SearchResults';
import Auth from '../../utils/auth';
import QuizList from '../../components/QuizList';
import RecentlyTaken from '../../components/RecentlyTaken';


export default function Dashboard() {
  const [searchInput, setSearchInput] = useState('');

  let token = localStorage.getItem('id_token');
  
  if (!token) {
    return <Redirect to='/' />
  };

  return (
    <div className='min-h-screen flex md:pt-16 justify-center bg-theme-lighter'>
      <div className='h-auto w-full md:h-eightyvh m-2 md:m-5 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4'>
        <div className='text-center h-full space-y-4 mt-20 md:mt-0'>
          <form className='h-10 md:h-ten'>
            <input 
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              type='text'
              className='w-full bg-theme-aliceblue placeholder-gray-400 placeholder-opacity-70 p-3 rounded'
              placeholder='Search for topics!'
            />
          </form>
          {!(searchInput === "") ? <SearchResults input={searchInput} /> : (
            <div className='h-2/3 md:h-ninety p-5 bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
              <p className="pb-10">Top Quizzes</p>
              <TopQuizzesList />
            </div>
          )}
        </div>
        <div className='flex flex-wrap space-y-0 md:space-y-4 text-xs lg:text-sm text-center'>
          <div className='h-ten justify-between w-full flex lg:w-full mt-12 md:pt-0 md:mt-0 gap-3'>
            <div className='w-full'>
              <Link to='/search'>
                <button className='p-3 h-10 md:h-16 bg-theme-darkerer hover:bg-theme-darkest hover:shadow-sm transition duration-200 rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                    <p>
                      Advanced Search
                    </p>
                </button>
              </Link>
            </div>
            <div className='w-full'>
              <Link to='/creator'>
                <button className='p-3 h-10 md:h-16 bg-theme-darkerer hover:bg-theme-darkest hover:shadow-sm transition duration-200 rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                  <p>
                    Create a quiz
                  </p>
                </button>
              </Link>
            </div>
            <div className='w-full'>
              <Link to='/' onClick={Auth.logout}>
                <button className='p-3 h-10 md:h-16 bg-theme-darkerer hover:bg-theme-darkest hover:shadow-sm transition duration-200 rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                  <p>
                    Log out
                  </p>
                </button>
              </Link>
            </div>
          </div>
          <div className='grid h-ninety p-5 flex-grow bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
          <QuizList />
          </div>
        </div>
        <div className='text-center space-y-4'>
        <div className="hidden md:grid h-auto text-sm md:text-lg overflow-y-auto md:h-1/2 p-5 bg-theme-bluegray font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
            Recently Taken
            <RecentlyTaken />
        </div>
          <div className='hidden md:grid h-1/2 p-5 bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
            Top Users
            <TopUsersList />
          </div>
        </div>
      </div>
    </div>
  )
}
