import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard';
import Entertain from './components/Entertain'
import Add from './components/Add'
import UpdateMovieForm from './components/UpdateMovie'
import UpdateSeriesForm from './components/UpdateSeries'
import DetailMovie from './components/DetaiMovie'
import DetailSeries from './components/DetailSeries'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

function App() {
  return (
    <ApolloProvider client = { client }>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/entertainme/movies/update/:id">
              <UpdateMovieForm />
            </Route>
            <Route exact path="/entertainme/series/update/:id">
              <UpdateSeriesForm />
            </Route>
            <Route exact path="/entertainme/movies/:id">
              <DetailMovie />
            </Route>
            <Route exact path="/entertainme/series/:id">
              <DetailSeries />
            </Route>
            <Route path="/entertainme/add">
              <Add />
            </Route>
            <Route path="/entertainme">
              <Entertain />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
