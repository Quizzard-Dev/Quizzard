import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

export default function Splash() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-theme-lighter'>
      <div className='mx-auto my-20 w-4/5 md:w-2/3'>
        <div className='container shadow-xl grid grid-cols-1 divide-y divide-y-8 divide-theme-lighter bg-theme-bluegray text-theme-aliceblue p-6 rounded-md border-2 border-theme-main md:border-4'>
          <div className='p-2 whitespace-nowrap md:whitespace-normal text-2xl lg:text-3xl animate-float font-semibold'>
            <p className='font-title text-center tracking-wide'>
              Welcome to Quizzard!
            </p>
          </div>
          <div className='p-2 text-sm md:text-base'>
            <p>
              A web app where users can create and take quizzes on a variety of topics. Their results and the amount of times the quiz has been taken are stored, to be proudly displayed on the homepage.
            </p>
          </div>
          <div className='p-2 text-sm md:text-base'>
            <p>
              To get started with Quizzard, simply <span className='text-theme-complement'>sign up using the button in the top right</span> or log in if you already have an account. Once logged in, you can search for a quiz, or if there isn't one on a certain topic, making a quiz is very intuitive!
            </p>
          </div>
          <div className='p-2 text-sm md:text-base'>
            <p>
              The <span className='text-theme-complement'>top quizzes</span> are determined by the amount of times a quiz has been taken, and <span className='text-theme-complement'>top tags</span> are controlled by how many quizzes belong to that tag. <span className='text-theme-complement'>Top users</span> are decided by the amount of quizzes they've made and the amount of times their quizzes have been taken.
            </p>
          </div>
          <div className='p-2 text-sm md:text-base'>
            <p>
              Quizzard is a progressive web app built on the MERN stack, and uses GraphQL/Apollo for routing as opposed to a RESTful API. Created by <span className='text-theme-bluedarkgray'>Jared Donovan</span> and <span className='text-theme-bluedarkgray'>Anthony Krueger</span>, this is the final project for{" "}
              <span className='text-theme-darkroyal'>
                Northwestern University's
              </span>{" "}
              Full-Stack Web Development Boot Camp.
            </p>
          </div>
          <div className='p-2 text-center space-y-2'>
            <h2 className="text-xl font-bold">Links</h2>
            <div className='grid grid-cols-1 justify-center md:flex md:divide-x divide-theme-lighter items-center'>
              <div className='flex items-center justify-between md:space-x-1 p-3'>
                <p className='text-gray-200 text-sm md:text-base'>
                  Github Repo:
                </p>
                <a 
                  className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                  href='https://github.com/Quizzard-Dev/Quizzard' 
                  target='_blank' 
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faGithub} size='3x'/>
                </a>
              </div>
              <div className='flex items-center justify-between md:space-x-1 p-3'>
                <p className='text-gray-200 text-sm md:text-base'>
                  Jared: 
                </p>
                <div className='flex space-x-3'>
                  <a 
                    className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                    href='https://github.com/jdono100' 
                    target='_blank' 
                    rel='noreferrer'
                  >
                    <FontAwesomeIcon icon={faGithub} size='2x'/> 
                  </a>
                  <a
                    className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                    href='https://www.linkedin.com/in/jared-donovan/' 
                    target='_blank' 
                    rel='noreferrer'
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} size='2x'/>
                  </a>
                  <a
                    className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                    href='http://www.jareddonovanportfolio.com/' 
                    target='_blank' 
                    rel='noreferrer'
                  >
                    <FontAwesomeIcon icon={faAddressCard} size='2x'/>
                  </a>
                </div>
              </div>
              <div className='flex items-center justify-between md:space-x-1 p-3'>
                <p className='text-sm md:text-base text-gray-200'>
                  Anthony: 
                </p>
                <div className='flex space-x-3'>
                  <a
                    className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                    href='https://github.com/AnthonyKrueger' 
                    target='_blank' 
                    rel='noreferrer'
                  >
                    <FontAwesomeIcon icon={faGithub} size='2x'/> 
                  </a>
                  <a
                    className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                    href='https://www.linkedin.com/in/anthony-krueger-1545a5208/' 
                    target='_blank' 
                    rel='noreferrer'
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} size='2x'/>
                  </a>
                  <a
                    className='text-theme-berry hover:text-theme-darkberry transition duration-200' 
                    href='https://aik-portfolio.herokuapp.com/' 
                    target='_blank' 
                    rel='noreferrer'
                  >
                    <FontAwesomeIcon icon={faAddressCard} size='2x'/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
