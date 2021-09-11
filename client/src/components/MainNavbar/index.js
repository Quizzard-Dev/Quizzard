import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import LogInForm from '../LogInForm';
import SignUpForm from '../SignUpForm';
import Auth from '../../utils/auth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'inline',
    textAlign: 'right'
  }
};

Modal.setAppElement(document.getElementById('root'));

export default function MainNavbar() {
  let navClasses = 'mx-auto flex justify-between bg-theme-main p-8';

  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState('login-radio');

  useEffect(() => {
    if (Auth.loggedIn()) {
      let loggedInUser = Auth.getProfile().data.username
      console.log(loggedInUser);
    }
  });

  function openModal() {
    setIsOpen(true);
  };
  
  function closeModal() {
    setIsOpen(false);
  };

  function handleRadioChange(event) {
    console.log(event.target);
  }

  return (
    <div className={navClasses}>
      <div>
        <a as={Link} href='/'>
          Quizzard
        </a>
      </div>
      <div className='flex space-x-3'>
        {Auth.loggedIn() ? (
          <>
            <p>{Auth.getProfile().data.username}</p>
            <button className='px-4 py-3 bg-red-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform' onClick={Auth.logout}>Logout</button>
          </>
        ) : (
          <>
          <button className='openModal text-center' onClick={openModal}>Log In | Sign Up</button>
          </>
        )}
      </div>
      <Modal 
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldReturnFocusAfterClose={false}
        shouldCloseOnOverlayClick={true}
        contentLabel="Login/Signup Modal"
        >
        <button className="text-center" onClick={closeModal}><FontAwesomeIcon icon={faTimes} size='2x' /></button>
        <form>
          <fieldset className='text-center space-x-4'>
            <label>
              <input id='login-radio' checked={checked === 'login-radio'} value='login-radio' onClick={() => setChecked('login-radio')} onChange={handleRadioChange} name='modalRadio' type='radio' /> Log In
            </label>
            <label>
              <input id='signup-radio' checked={checked === 'signup-radio'} value='signup-radio' onClick={() => setChecked('signup-radio')} onChange={handleRadioChange} name='modalRadio' type='radio' /> Sign Up
            </label>
          </fieldset>
        </form>
        <div>
          {checked === 'login-radio' ? <LogInForm /> : <SignUpForm />}
        </div>
      </Modal>
    </div>
  )
};
