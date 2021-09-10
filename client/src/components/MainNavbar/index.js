import React, { useState } from 'react';
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
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
};

Modal.setAppElement(document.getElementById('root'));

export default function MainNavbar() {
  let navClasses = 'mx-auto flex justify-between bg-theme-main p-8';
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  };

  return (
    <div className={navClasses}>
      <div>
        <a as={Link} href='/'>
          Quizzard
        </a>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
          <p>Username</p>
          <p>Logout</p>
          </>
        ) : (
          <button className='openModal text-center' onClick={openModal}>Log In | Sign Up</button>
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
        <button className="float-right" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
        <form>
          <fieldset>
            <label>
              <input id='login-radio' name='modalRadio' type='radio' /> Log In
            </label>
            <label>
              <input id='signup-radio' name='modalRadio' type='radio' /> Sign Up
            </label>
          </fieldset>
          <fieldset>
            <LogInForm />
            <SignUpForm />
          </fieldset>
        </form>
      </Modal>
    </div>
  )
};
