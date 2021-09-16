import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";
import Auth from "../../utils/auth";

import { GET_QUIZ } from "../../utils/queries";
import { SUBMIT_QUIZ } from "../../utils/mutations";

import Alert from "../../components/Alert"

export default function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState({});

  const [answers, setAnswers] = useState([]);

  const [grades, setGrades] = useState({percentage: 0, results: []})

  const [alert, setAlert] = useState({show: false, message:""})

  const [started, setStarted] = useState(false)

  const [redirect, setRedirect] = useState(false)

  const [submitQuiz] = useMutation(SUBMIT_QUIZ)

  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_QUIZ, {
    variables: { quizId: id }
  });

  useEffect(() => {
    setCurrentQuestion(data ? data.quiz.questions[0] : {});
    if (!answers.length && data) {
      const answerList = data.quiz.questions.map(question => {
        return ({ chosenAnswer: 0, questionIndex: question.index });
      })
      setAnswers(answerList);
    }
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
      let newAnswers = answers;
      newAnswers[question.index - 1].chosenAnswer = answer.index;
      setAnswers(newAnswers);
      forceUpdate();
  };

  function getChosenAnswer(questionIndex) {
      const chosenIndex = answers.find(answer => answer.questionIndex === questionIndex).chosenAnswer
      return data.quiz.questions[questionIndex - 1].answers[chosenIndex - 1]?.answerText
  }

  function gradeColor(percentage) {
    if(percentage == 1) {
      return "theme-magenta"
    }
    else if(percentage >= 0.85) {
      return "green-500"
    }
    else if (percentage >= 0.7) {
      return "yellow-300"
    }
    else if (percentage >= 0.6) {
      return "yellow-600"
    }
    else {
      return "red-700"
    }
  }

  async function gradeQuiz() {
      let valid = true
      answers.forEach(answer => {
          if(answer.chosenAnswer === 0) {
              valid = false
          }
      })
      if(valid) {
          const { data } = await submitQuiz({
              variables: {quizId: id, answers: answers}
          })
          setGrades(data.submitQuiz)
      }
      else {
          setAlert({show: true, message: "You have unanswered questions!"})
      }
  }

  function handleQuizEdit() {
    localStorage.setItem('quiz', JSON.stringify(data?.quiz));
    setRedirect(true);
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

  if (redirect) {
    return <Redirect to="/creator" />;
  };

  if (loading) {
    return (
      <div className='min-h-screen items-center justify-center flex bg-theme-lighter'>
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-theme-main"></div>
        </div>
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
    <div className='items-center justify-center flex bg-theme-lighter'>
      <div className="rounded mt-36 w-full shadow-lg p-5 bg-theme-main mx-1 md:mx-0 md:w-10/12">
        <h3 className="text-4xl text-white font-main">{data.quiz.title}</h3>
        {!started && data ?
        <div className="w-full mx-auto">
        <div className="grid grid-cols-2 px-5 gap-5">
        <div className="w-full my-10 mx-auto p-3 bg-theme-aliceblue border-4 border-theme-darker rounded-lg">
            <h2 className="text-xl font-bold text-theme-bluegray underline">Description</h2>
            <p className="mx-3 py-3">{data.quiz.description}</p>
        </div>
            <div className="w-full my-10 mx-auto p-3 bg-theme-aliceblue border-4 border-theme-darker rounded-lg">
                <h2 className="text-xl text-theme-bluegray font-bold underline">Recent Scores</h2>
                {data.quiz.scores.map(score => {
                    return (
                        <div className="flex justify-between w-1/2 mx-auto">
                            <span className="text-lg font-semibold">{score.username}</span>
                            <span className={`text-lg font-semibold text-${gradeColor(score.percent)}`}>{(score.percent * 100).toFixed()}%</span>
                        </div>
                    )
                })}
            </div>
        </div>
            <div className="text-center">
                <button className="py-2 px-8 bg-theme-lightmagenta hover:bg-theme-magenta transition duration-200 rounded center" onClick={() => setStarted(true)}>Start Quiz</button>
                {data.quiz.author === Auth.getProfile().data.username ?
                <button className="py-2 px-8 bg-green-400 hover:bg-green-600 ml-5 transition duration-200 rounded center" onClick={() => handleQuizEdit()}>Copy and Edit</button>
                : null
                }
            </div>
        </div>
        : null
        }
        {!grades.results.length && started
        ? 
        <div className="mt-10">
          <span>{currentQuestion.questionText}</span>
          <Answers question={currentQuestion} answersList={answers} />
          <div className="mt-10 items-center justify-center flex space-x-5">
          {currentQuestion.index !== 1 ?
            <button className="p-2 rounded bg-theme-darker" onClick={() => prevQuestion()}>Back</button>
            : null
          }
          {currentQuestion.index !== data.quiz.questions.length ?
            <button className="p-2 rounded bg-theme-darker" onClick={() => nextQuestion()}>Next Question</button>
          : <button onClick={() => gradeQuiz()} className="p-2 rounded bg-green-600">Submit Quiz</button>
          }
          </div>
          <div className="w-full text-right">
            <span className="pt-5 pr-2">{currentQuestion.index}/{data.quiz.questions.length}</span>
          </div>
        </div>
        : null}
        {grades.results.length ? 
        <div className="space-y-2 mt-5">
        <div className="text-center mb-5">
            <span className="text-3xl">You scored <span className={`font-semibold text-${gradeColor(grades.percentage)}`}>{(grades.percentage*100).toFixed()}</span>%</span>
        </div>
            {grades.results.map(grade => {
                return (
                    <div className={`p-2 flex justify-between rounded ${grade.correct ? "bg-green-400" : "bg-red-600"}`}>
                        <span>{data.quiz.questions[grade.questionIndex - 1].questionText}</span>
                        <span>Your Answer: {getChosenAnswer(grade.questionIndex)}</span>
                    </div>
                )
            })}
        </div>
        : null
        }
        {alert.show ?
        <div className="mt-5">
            <Alert message={alert.message} hideFunction={() => setAlert({show: false, message: ""})} />
        </div>
        : null}
        <div className="text-right mt-5">
          <span>Created By: {data.quiz.author} on {data.quiz.createdAt}</span>
        </div>
      </div>
    </div>
  );
};