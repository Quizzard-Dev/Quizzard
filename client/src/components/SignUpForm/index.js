import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { CREATE_USER } from '../../utils/mutations';

export default function SignUpForm() {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: ''});
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: {...userFormData}
      });

      if (!data) {
        throw new Error('something went wrong!');
      }
      console.log(data);
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <div>
      <form className='p-3' onSubmit={handleFormSubmit}>
      <input onChange={handleInputChange} type='text' className='w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full' placeholder='username' />
        <input onChange={handleInputChange} type='email' className='w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full' placeholder='john@website.com' />
        <input onChange={handleInputChange} type='password' className='w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full' placeholder='password' />
        {/* <input onChange={handleInputChange} type='password' className='w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full' placeholder='confirm password' /> */}
        <button 
          type='submit' className='w-full px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform'>
          Submit
        </button>
      </form>
    </div>
  )
};
