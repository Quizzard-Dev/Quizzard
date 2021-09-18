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
              The top quizzes are determined by the amount of times a quiz has been taken, and top tags are controlled by how many quizzes belong to that tag. Top users are decided by the amount of quizzes they've made and the amount of times their quizzes have been taken.
            </p>
          </div>
          <div className='p-2 text-sm md:text-base'>
            <p>
              Quizzard is a MERN stack, progressive web app, and uses GraphQL/Apollo for routing as opposed to a RESTful API. Created by <span className='text-theme-bluedarkgray'>Jared Donovan</span> and <span className='text-theme-bluedarkgray'>Anthony Krueger</span>, this is the final project for{" "}
              <span className='text-theme-darkroyal'>
                Northwestern University's
              </span>{" "}
              Full-Stack Web Development Boot Camp.
            </p>
          </div>
          <div className='p-2 text-center space-y-2'>
            <h2 className="text-xl font-bold">Links</h2>
            <div className='md:flex justify-center items-center md:space-x-5'>
              <div className='flex items-center justify-between md:space-x-2'>
                <p>
                  Github Repo:
                </p>
                <p className='text-sm md:text-base'>
                  <a>
                    <FontAwesomeIcon icon={faGithub} size='3x'/>
                  </a>
                </p>
              </div>
              <div className='flex items-center justify-between md:space-x-2'>
                <p className='text-sm md:text-base'>
                  Jared: 
                </p>
                <p>
                  <FontAwesomeIcon icon={faGithub} size='2x'/> 
                </p>
                <p>
                  <FontAwesomeIcon icon={faLinkedinIn} size='2x'/>
                </p>
                <p>
                  <FontAwesomeIcon icon={faAddressCard} size='2x'/>
                </p>
              </div>
              <div className='flex items-center justify-between md:space-x-2'>
                <p className='text-sm md:text-base'>
                  Anthony: 
                </p>
                <p>
                  <FontAwesomeIcon icon={faGithub} size='2x'/> 
                </p>
                <p>
                  <FontAwesomeIcon icon={faLinkedinIn} size='2x'/>
                </p>
                <p>
                  <FontAwesomeIcon icon={faAddressCard} size='2x'/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
