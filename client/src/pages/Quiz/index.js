import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_QUIZ } from "../../utils/queries";

export default function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState({});

  const [answers, setAnswers] = useState([]);

  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_QUIZ, {
    variables: { quizId: id }
  });

  useEffect(() => {
    setCurrentQuestion(data ? data.quiz.questions[0] : {});
  }, [data]);

  function nextQuestion() {
    if (currentQuestion.index < data.quiz.questions.length) {
      const nextQuestion = data.quiz.questions[currentQuestion.index];
      setCurrentQuestion(nextQuestion);
    };
  };

  function prevQuestion() {
    if (currentQuestion.index > 1) {
      const newIndex = (currentQuestion.index - 1);
      const prevQuestion = data.quiz.questions[newIndex - 1];
      setCurrentQuestion(prevQuestion);
    }
  }

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  function checkAnswer(question, answer) {
    if (!answers.length) {
      const answerList = data.quiz.questions.map(question => {
        return ({ chosenAnswer: 0, questionIndex: question.index })
      })
      setAnswers(answerList);
    }
    else {
      let newAnswers = answers;
      newAnswers[question.index - 1].chosenAnswer = answer.index;
      setAnswers(newAnswers);
      forceUpdate();
    };
  };

  function Answers({ question, answersList }) {
    if (question.answers) {
      const questionList = question.answers.map((answer) => {
        return (
          <div className="w-full flex justify-center" key={`${question.index}${answer.index}`}>
            <div onClick={() => checkAnswer(question, answer)} className={`w-3/4 p-2 rounded transition duration-200 ${answersList[question.index - 1]?.chosenAnswer === answer.index ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-600"}`}>
              <span>{answer.answerText}</span>
            </div>
          </div>
        )
      })
      return (
        <div className="space-y-3">
          {questionList}
        </div>
      );
    };
    return (
      <p>No Answers</p>
    );
  };


  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  };

  if (error) {
    return (
      <div className='min-h-screen items-center justify-center flex bg-theme-lighter'>
        <div className="p-10 rounded bg-red-400">
          <span className="text-3xl font-bold">Quiz ID not Found</span>
        </div>
      </div>
    );
  };



  return (
    <div className='min-h-screen justify-center flex bg-theme-lighter'>
      <div className="rounded mt-20 w-full shadow-lg p-5 bg-theme-bluegray mx-1 md:mx-0 md:w-10/12">
        <h3 className="text-3xl text-white font-main">{data.quiz.title}</h3>
        <span>Created By: {data.quiz.author}</span>
        <div className="w-full p-3 container rounded bg-theme-lighter">
          <span>{currentQuestion.questionText}</span>
          <Answers question={currentQuestion} answersList={answers} />
          <div className="mt-10 items-center justify-center flex space-x-5">
            <button className="p-2 rounded bg-theme-darker" onClick={() => prevQuestion()}>Back</button>
            <button className="p-2 rounded bg-theme-darker" onClick={() => nextQuestion()}>Next Question</button>
          </div>
        </div>
      </div>

    </div>
  );
};