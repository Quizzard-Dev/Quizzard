# Quizzard

  
  

  ## Description
  
  Quizzard is an application that allows users to create and take quizzes of their own design. Using the quiz creator, the user can create a multiple choice quiz that can be assigned different tags for easy searching and sorting. Once created, quizzes are added to a MongoDB database, allowing other users tosearch for and take it. Quizzes are sorted by their popularity, and recent scores are displayed on each individual quiz page. Saved quizzescan be duplicated and editted by their creator. Users can search for quizzes by title, author, or by tags.
  

  ## Table of Contents
  
  - [Deployed App](#deployedapp)
  - [Usage](#usage)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [Questions](#questions)

  ## Deployed App

  The live version of this application can be found [HERE](https://quizzardweb.herokuapp.com/)
  
  ## Usage
  
  To use Quizzard, you'll want to start by creating an account. From there, usage depends on what you want to do. 
  
  If you'd like to create a quiz for other users to take, you can navigate to the Quiz Creator form the dropdown menu or from your dashboard. From here, you can begin creating a quiz by adding your first question. On each question you add, you can add answers and choose which answer is correct. Once you have a quiz with a title, description, at least 3 questions, and at least 1 tag, you can publish your quiz for the world to see! 
  
  If you're coming to quizzard for learning purposes, you can find quizzes to take a few different ways. You can use the search function on your dashboard which searched quizzes by title OR you can navigate to the advanced search page. From here, you can search by Title, Author, or Tags and see more information about individual quizzes. You can also fins quizzes form the "Top Quizzes" section on your dashboard. Once on a quiz page, you'll be greeted by some info about the quzi including a description and recent scores. Here is where you can click "Start Quiz" to start learning!

  ## Installation
  
  To install the app, dependencies must be installed for both the server and client side of the applicaiton. This can be done simply by navigating to the root directory of client and server and running 
  
  ```npm i```
  
  Once dependencies are installed, you can run the server and client individually by navigating to their directories and running 
  
  ```npm start```
  
  The client uses a proxy to talk to the backend during development as long as you have both the server and client running.
  

  

  ## Contributing
  
  We are open to contributions from new features to bugfixes. Simply clone and make a pull request if you have any features you think would be useful.
  


  ## Questions
  
  Contact us at [Anthony's Github Profile](https://github.com/AnthonyKrueger) or [Jared's Github Profile](https://github.com/jdono100)