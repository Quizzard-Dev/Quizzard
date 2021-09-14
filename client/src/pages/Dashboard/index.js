import React, { useState } from 'react'
import QuizList from '../../components/QuizList';

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-theme-lighter'>
      <div className='w-screen m-5 mt-20 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4' style={{
        height: "80vh"
      }}>
        <div className='text-center h-full space-y-4'>
          <form className='h-ten'>
            <input 
              value={searchInput}
              onChange={(e) => handleSearchSubmit(e)}
              type='text'
              className='w-full bg-theme-aliceblue placeholder-gray-400 placeholder-opacity-70 p-3 rounded'
              placeholder='Search for topics!'
            />
          </form>
          <div className='h-96 md:h-ninety p-5 bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
            Top Quizzes
          </div>
        </div>
        <div className='flex flex-wrap space-y-4 text-center h-full'>
          <div className='h-1/3 w-full space-y-4 inline items-center'>
            <div>
              <button className='w-full px-4 py-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                Create a new quiz
              </button>
            </div>
            <div>
              <button className='w-full px-4 py-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                Logout
              </button>
            </div>
            <div>
              <button className='w-full px-4 py-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                Third button
              </button>
            </div>
            <div>
              <button className='w-full px-4 py-3 bg-theme-main rounded-md text-white outline-none focus:ring-4 shadow-lg'>
                Fourth button
              </button>
            </div>
          </div>
          <div className='hidden md:grid h-2/3 p-5 flex-grow bg-theme-bluegray text-lg font-semibold text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main'>
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
