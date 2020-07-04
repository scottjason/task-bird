import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Tasks from './components/Tasks/';
import Navbar from './components/Navbar/';
import NewTask from './components/NewTask/';
import UpdateTask from './components/UpdateTask/';

function App() {
  return (
    <Router>
        <Navbar Link={Link} />
        <Route exact path='/' component={Tasks} />
        <Route path='/new-task' component={NewTask} />
        <Route path='/task/:id' component={UpdateTask} />
    </Router>
  );
}

export default App;
