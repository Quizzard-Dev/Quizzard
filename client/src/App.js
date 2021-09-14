import React from 'react';
import {Redirect} from "react-router"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from '@apollo/client/link/context';

import MainNavbar from './components/MainNavbar';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import QuizCreator from './pages/QuizCreator'
import Quiz from './pages/Quiz';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

const testQuiz = {}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <MainNavbar />
          <Switch>
            <Route exact path='/' component={Splash} />
            <Route exact path='/home' component={Dashboard} />
            <Redirect exact from="/home/reload" to="/home" />
            <Route path="/creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz}/>
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
