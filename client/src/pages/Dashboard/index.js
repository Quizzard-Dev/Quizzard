import React, { useState } from 'react'
import QuizList from '../../components/QuizList';

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-theme-lighter'>
      <div className='w-screen m-5 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='text-center'>
          <form>
            <input 
              value={searchInput}
              onChange={(e) => handleSearchSubmit(e)}
              type='text'
              className='w-full bg-theme-aliceblue placeholder-gray-400 placeholder-opacity-70 p-3 rounded'
              placeholder='Search for topics!'
            />
          </form>
          <div>
            Top Quizzes
          </div>
        </div>
        <div>
          <QuizList />
        </div>
        <div>
          Sup
        </div>
      </div>
    </div>
  )
}
