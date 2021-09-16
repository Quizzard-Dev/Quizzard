import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { DELETE_QUIZ } from "../../utils/mutations";
import { GET_QUIZZES } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function QuizList() {
  const [deleteQuiz] = useMutation(DELETE_QUIZ);

  const [redirect, setRedirect] = useState("");

  const { loading, data, refetch, fetchMore } = useQuery(GET_QUIZZES, {
    variables: { 
      authorId: Auth.getProfile().data._id, 
      offset: 0, 
      limit: 10
    },
    fetchPolicy: "cache-and-network"
  });
  
  
  let quizData = data?.quizzes || [];

  if (loading) {
    return (
      <div className="h-auto overflow-y-auto md:h-1/2 p-5 bg-theme-bluegray text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
        <h2 className="text-xl font-bold">Loading</h2>
      </div>
    );
  };

  async function handleQuizDelete(quiz, e) {
    e.stopPropagation();
    e.preventDefault();
    const { data } = await deleteQuiz({
      variables: { quizId: quiz._id }
    });
    if(data) {
      refetch()
    }
  };

  if (loading) {
    return (
      <div className="h-auto overflow-y-auto flex justify-center md:h-1/2 p-5 bg-theme-bluegray text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
        </div>
      </div>
    )
  }

  if (redirect) {
    return <Redirect to="/creator" />;
  };

  return (
    <div className="h-auto overflow-y-auto md:h-1/2 p-5 bg-theme-bluegray text-theme-aliceblue border-2 md:border-4 rounded-md border-theme-main">
      <h2 className="text-lg mb-5 font-semibold">Your Quizzes</h2>
      {quizData.length
        ? (<div>
          <span>{`You have ${quizData.length} Saved Quizzes`}</span>
          <div className="mt-5 flex flex-col space-y-3 container">
            {quizData.map((quiz, i) => {
              return (
                <Link key={i} to={`/quiz/${quiz._id}`}>
                  <div className="flex justify-between container rounded bg-theme-darkerer hover:bg-theme-darkest hover:shadow-sm transition duration-200 px-2 py-1">
                    <span>{quiz.title}</span>
                    <div className="px-1" onClick={(e) => handleQuizDelete(quiz, e)}>
                      <span><FontAwesomeIcon icon={faTimes} /></span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>)
        : `You have no Saved Quizzes`}
    </div>
  )
};
