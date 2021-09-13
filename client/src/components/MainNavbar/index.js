import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import LogInForm from '../LogInForm';
import SignUpForm from '../SignUpForm';
import Dropdown from '../Dropdown';
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
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState('login-radio');

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
    <nav className='w-full fixed bg-theme-main z-10'>
      <div className='flex items-center justify-between mx-auto w-11/12 py-3'>
        <div>
          <Link to="/">
            <a className='tracking-widest font-main text-xl' as={Link} href='/'>
              Quizzard
            </a>
          </Link>
        </div>
        <div className=''>
          {Auth.loggedIn() ? (
            <>
              <Dropdown/>
            </>
          ) : (
            <>
            <button className='openModal font-main text-center' onClick={openModal}>Log In | Sign Up</button>
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
    </nav>
  )
};
