import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import { useMutation } from '@apollo/client';
import { CREATE_QUIZ } from '../../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Hint } from 'react-autocomplete-hint';

import Alert from '../../components/Alert';

export default function QuizCreator() {
  const [createQuiz, {error}] = useMutation(CREATE_QUIZ);

  const [alert, setAlert] = useState({show: false, message:""})

  const baseQuiz = {
    title: "",
    description: "",
    tags: [],
    questions: []
  };

  const baseQuestion = {
    questionText: "",
    answers: [],
    index: 0
  };

  const baseAnswer = {
    answerText: "",
    isCorrect: false,
    index: 0
  };

  const tags = [
    "Programming",
    "Javascript",
    "Node",
    "MySQL",
    "CSS",
    "React",
    "MongoDB",
    "WebDev",
    "HTML",
    "Movies",
    "Television",
    "Math",
    "History",
    "Science",
    "Geography"
  ]

  const loadedQuiz = localStorage.getItem('quiz')
    ? JSON.parse(localStorage.getItem('quiz'))
    : baseQuiz;

  if (loadedQuiz.__typename) {
    delete loadedQuiz.__typename;
    loadedQuiz.questions.map((question) => {
      delete question.__typename;
      question.answers.map((answer) => {
        delete answer.__typename;
        return answer;
      });
      return question;
    });
  };

  if (loadedQuiz._id || loadedQuiz.author) {
    delete loadedQuiz._id;
    delete loadedQuiz.author;
    delete loadedQuiz.takers;
  };

  if(loadedQuiz.createdAt) {
    delete loadedQuiz.createdAt
  }

  if(loadedQuiz.scores) {
    delete loadedQuiz.scores
  }

  if(!loadedQuiz.tags) {
    loadedQuiz.tags = []
  }

  useEffect(() => {
    if(error) {
      setAlert({show: true, message: error.message})
    }
  }, [error])

  const [quiz, setQuiz] = useState(loadedQuiz);

  const [currentQuestion, setCurrentQuestion] = useState({});

  const [currentAnswer, setCurrentAnswer] = useState({});

  const [tagText, setTagText] = useState("")

  const [redirect, setRedirect] = useState(false);

  function addQuestion() {
    if(currentAnswer.answerText) {
      updateAnswer();
    }
    updateQuestion()
    const newQuestionList = quiz.questions;
    if(newQuestionList.length < 30) {
      const newQuestion = baseQuestion;
      newQuestion.index = quiz.questions.length + 1;
      newQuestionList.push(baseQuestion);
      setQuiz({ ...quiz, questions: newQuestionList });
      setCurrentAnswer({})
      setCurrentQuestion(newQuestion)
      setTimeout(() => {
        const questionInput = document.querySelector("#questionInput")
        if(questionInput) {
          questionInput.focus()
        }
      }, 100)
    }
    else {
      setAlert({show: true, message: "Max of 30 questions!"})
    }
  };

  function addAnswer() {
    updateAnswer()
    const newAnswerList = currentQuestion.answers;
    if(newAnswerList.length < 10) {
      const newAnswer = baseAnswer;
      newAnswer.index = currentQuestion.answers.length + 1;
      if (newAnswer.index === 1) {
        newAnswer.isCorrect = true;
      };
      newAnswerList.push(newAnswer);
      setCurrentQuestion({ ...currentQuestion, answers: newAnswerList });
      setCurrentAnswer(newAnswer)
      updateQuestion()
      setTimeout(() => {
        const answerInput = document.querySelector("#answerInput")
        if(answerInput) {
          answerInput.focus()
        }
      }, 100)
    }
    else {
      setAlert({show: true, message: "Max of 10 answers per question!"})
    }
  };

  function updateQuestion() {
    const newQuestionList = quiz.questions;
    newQuestionList[currentQuestion.index - 1] = currentQuestion;
    setQuiz({ ...quiz, questions: newQuestionList });
    localStorage.setItem('quiz', JSON.stringify(quiz));
  };

  function updateAnswer() {
    const newAnswerList = currentQuestion.answers;
    newAnswerList[currentAnswer.index - 1] = currentAnswer;
    setCurrentQuestion({ ...currentQuestion, answers: newAnswerList });
  };

  function handleQuestionInput(value) {
    setCurrentQuestion({ ...currentQuestion, questionText: value })

  }

  function handleQuestionChange(question) {
    if(currentAnswer.answerText) {
      updateAnswer()
    }
    updateQuestion();
    setCurrentQuestion(question);
    setCurrentAnswer({});
    setTimeout(() => {
      const questionInput = document.querySelector("#questionInput")
      if(questionInput) {
        questionInput.focus()
      }
    }, 100)
  };

  function handleAnswerChange(answer) {
    updateAnswer();
    updateQuestion();
    setCurrentAnswer(answer);
    setTimeout(() => {
      const answerInput = document.querySelector("#answerInput")
      if(answerInput) {
        answerInput.focus()
      }
    }, 100)
  };

  function handleQuestionDelete(question, e) {
    e.stopPropagation();
    if(currentAnswer.answerText) {
      updateAnswer();
    }
    updateQuestion();
    if (question.index === currentQuestion.index) {
      setCurrentQuestion({});
      setCurrentAnswer({});
    };

    const newQuestionList = quiz.questions;
    const delIndex = newQuestionList.indexOf(question);
    newQuestionList.splice(delIndex, 1);
    newQuestionList.forEach((question, index) => {
      question.index = (index + 1);
    });
    setQuiz({ ...quiz, questions: newQuestionList });
  };

  function handleAnswerDelete(answer, e) {
    e.stopPropagation();
    updateAnswer();
    if (answer.index === currentAnswer.index) {
      setCurrentAnswer({});
    };
    const newAnswerList = currentQuestion.answers;
    const delIndex = newAnswerList.indexOf(answer);
    newAnswerList.splice(delIndex, 1);
    newAnswerList.forEach((answer, index) => {
      answer.index = (index + 1);
    })
    if (answer.isCorrect && newAnswerList.length) {
      newAnswerList[0].isCorrect = true;
    }
    setCurrentQuestion({ ...currentQuestion, answers: newAnswerList });
  }

  function handleCorrectChange(correctAnswer, e) {
    e.stopPropagation();
    const newAnswerList = currentQuestion.answers.map((answer) => {
      if (answer === correctAnswer) {
        answer.isCorrect = true;
      }
      else {
        answer.isCorrect = false;
      }
      return answer;
    })
    console.log(newAnswerList);
    setCurrentQuestion({ ...currentQuestion, answers: newAnswerList });

  }

  function handleQuizValidate() {
    if(currentAnswer.answerText) {
      updateAnswer();
    }
    updateQuestion();
    let valid = true
    if(!quiz.title) {
      valid = false;
      setAlert({show: true, message: "You need a title!"})
    }
    if(!(quiz.description.length >= 10)) {
      valid = false;
      setAlert({show: true, message: "You need a Description of at least 10 characters!"})
    }
    if(!(quiz.questions.length >= 3)) {
      valid = false;
      setAlert({show: true, message: "You need at least 3 questions!"})
    }
    if(!quiz.tags.length) {
      valid = false;
      setAlert({show: true, message: "At least 1 tag is required!"})
    }
    quiz.questions.forEach(question => {
      if(!(question.answers.length >= 2)) {
        valid= false;
        setAlert({show: true, message: "Each question must have at least 2 answers!"})
      }
      if(!question.questionText) {
        valid= false;
        setAlert({show: true, message: "Questions are missing text!"})
      }
      question.answers.forEach(answer => {
        if(!answer.answerText) {
          valid= false;
          setAlert({show: true, message: "Answers are missing text!"})
        }
      })
    })
    if(valid) {
      handleQuizCreate()
    }
  }

  function deleteTag(tag) {
    const newTags = quiz.tags
    const delIndex = newTags.indexOf(tag)
    newTags.splice(delIndex, 1)
    setQuiz({...quiz, tags: newTags})
  }

  function handleTagSubmit() {
    const newTags = quiz.tags
    if(newTags.length < 5) {
      if(tagText.length < 13) {
        newTags.push(tagText)
        setQuiz({...quiz, tags: newTags})
      }
      else {
        setAlert({show: true, message:"Maximum tag length is 12 characters!"})
      }
    }
    else {
      setAlert({show: true, message:"Maximum allowed tags is 5!"})
    }
    setTagText("")
  }

  function handleTagInputEnter(e) {
    if(e.key === "Enter") {
      handleTagSubmit()
    }
  }

  async function handleQuizCreate() {
    const { data } = await createQuiz({
      variables: { input: quiz }
    })
    if (data) {
      setCurrentQuestion({});
      setCurrentAnswer({});
      setQuiz(baseQuiz);
      if (localStorage.getItem('quiz')) {
        localStorage.removeItem('quiz');
      }
      setRedirect(true);
    }
  }

  let token = localStorage.getItem('id_token');

  if (!token) {
    return <Redirect to='/' />;
  };

  if (redirect) {
    return <Redirect to="/home/reload" />;
  };

  return (
    <div className='min-h-screen flex bg-theme-lighter'>
      <div className="bg-theme-bluegray border-2 md:border-4 border-theme-main mt-20 w-full rounded shadow-lg p-5 m-5">
        <div className='mb-3 md:flex md:justify-between'>
          <h1 className="text-2xl font-bold font-title text-center md:text-right mb-3">Quiz Creator</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-3 text-theme-aliceblue">

          {/* Questions List */}

          <div className="bg-theme-complement rounded-lg p-3">
            <h2 className="text-lg font-bold mb-4 text-center">Question List</h2>
            <div className="rounded container border-2 border-theme-aliceblue bg-theme-smoke p-2 mt-3">
              <div className="space-y-2 flex flex-col">
                {quiz.questions.length ? quiz.questions.map((question) => {
                  return (
                    <div onClick={() => handleQuestionChange(question)} className={`flex flex-row justify-between container ${currentQuestion.index === question.index ? "bg-theme-blueblack shadow-md" : "bg-theme-bluemidgray hover:bg-theme-bluedarkgray"} rounded p-2 transition duration-200`} key={question.index}>
                      <span><strong>{question.index}. ) </strong>{question.questionText}</span>
                      <div onClick={(e) => handleQuestionDelete(question, e)} className="px-1 transition duration-100 hover:text-red-700 cursor-pointer">
                        <span><FontAwesomeIcon icon={faTimes} /></span>
                      </div>
                    </div>
                  )
                }) : <p className='text-center italic'>Add questions by clicking the button below</p>}
              </div>
              <button className="mt-4 w-full rounded py-1 font-semibold hover:bg-theme-darkmagenta bg-theme-lightmagenta transition duration-200" onClick={() => addQuestion()}>
                <FontAwesomeIcon icon={faPlus}/> Question
              </button>
            </div>
          </div>

          {/* Question Editor */}

          <div className="bg-theme-complement rounded-lg p-3">
            <h2 className="text-lg font-bold mb-4 text-center">Question Editor</h2>
            {currentQuestion.index ? (
              <>
                  <form>
                    <textarea id="questionInput" className="hover:bg-gray-200 transition duration-200 text-black w-full rounded p-1" type="text" value={currentQuestion.questionText} placeholder="Make sure the correct answer is selected..." onChange={(e) => handleQuestionInput(e.target.value)}/>
                  </form>

              {/* Answers List */}

                <div className="rounded container border-2 border-theme-aliceblue bg-theme-smoke p-2 mt-3">
                    <span className="font-semibold text-lg">Answers</span>
                    <div className="space-y-2">
                      {currentQuestion.answers.map((answer, index) => {
                        return (
                          <div onClick={() => handleAnswerChange(answer)} className={`flex flex-row justify-between container rounded ${currentAnswer.index === answer.index ? "bg-theme-blueblack shadow-md" : "bg-theme-bluemidgray hover:bg-theme-bluedarkgray"} transition duration-200 p-2`} key={index}>
                            <span><strong>{answer.index}. </strong>{answer.answerText}</span>
                            <div className="flex">
                              <div className="px-3">
                                <input checked={answer.isCorrect} onChange={(e) => handleCorrectChange(answer, e)} type="checkbox" />
                              </div>
                              <div onClick={(e) => handleAnswerDelete(answer, e)} className="px-1 transition duration-100 hover:text-red-700 cursor-pointer">
                                <span><FontAwesomeIcon icon={faTimes} /></span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <button onClick={() => addAnswer()} className="mx-auto hover:bg-theme-darkmagenta bg-theme-lightmagenta py-1 font-semibold rounded w-full mt-2 transition duration-200">
                      <FontAwesomeIcon icon={faPlus}/>  Answer
                    </button>

                </div>
              </>
            ) : (
              <p className='text-center italic'>Select a question to edit</p>
            )}



          </div>

          {/* Answer Editor */}

          <div className="bg-theme-complement rounded-lg p-3">
            <h2 className="text-lg font-bold mb-4 text-center">Answer Editor</h2>
            {currentAnswer.index ? (
              <>
                <div className="rounded container border-2 border-theme-aliceblue bg-theme-smoke p-2 mt-3">
                  <form>
                    <textarea id="answerInput" className="hover:bg-gray-200 transition duration-200 text-black w-full rounded p-1" type="text" value={currentAnswer.answerText} placeholder="Answer" onChange={(e) => setCurrentAnswer({ ...currentAnswer, answerText: e.target.value })} />
                  </form>
                </div>
              </>
            ) : (
              <p className='text-center italic'>Select an answer to edit</p>
            )}
          </div>
        </div>


        <div className="flex flex-wrap justify-center mt-8 gap-3 lg:gap-10">
        <div>
          <input className="hover:bg-gray-200 transition duration-200 bg-theme-aliceblue w-full md:w-96 rounded-lg" type="text" value={quiz.title} placeholder="Enter a title..." onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
        </div>
          <div>
           <input className="hover:bg-gray-200 transition duration-200 bg-theme-aliceblue w-full md:w-96 rounded-lg" type="text" value={quiz.description} placeholder="Enter a description..." onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
          </div>
          <div className="justify-center">
          <Hint options={tags} allowTabFill>
            <input className="hover:bg-gray-200 transition duration-200 bg-theme-aliceblue w-full md:w-96 rounded-lg"
              value={tagText}
              type="text"
              placeholder="Add tags..."
              onChange={e => setTagText(e.target.value)}
              onKeyDown={e => handleTagInputEnter(e)}
            />
          </Hint>
          {quiz.tags.length ? 
          <div className="grid grid-cols-3 w-full gap-2 mt-3 flex-grow-0">
            {quiz.tags.map(tag => {
              return(
                <div className="p-1 rounded-xl text-sm bg-yellow-300 flex justify-between">
                <span className="overflow-x-hidden max-w-sm">{tag}</span>
                <div onClick={() => deleteTag(tag)} className="transition duration-100 hover:text-red-700 cursor-pointer px-1">
                  <span><FontAwesomeIcon icon={faTimes} /></span>
                </div>
                </div>
              )
            })}
          </div>
          : null}
          </div>
        </div>
        <div className="text-center">
          <button disabled={quiz.questions.length < 3 ? true : false} onClick={() => handleQuizValidate()} className={`rounded ${quiz.questions.length >= 3 ? "bg-green-500 hover:bg-green-700" : "bg-gray-500"} mx-auto font-bold text-lg mt-10 py-3 px-20 transition duration-200`}>Create Quiz</button>
        </div>
        {alert.show ?
        <div className="mt-8">
          <Alert message={alert.message} hideFunction={() => setAlert({show: false, message:""})} />
        </div>
        : null}
      </div>
    </div>
  )
}