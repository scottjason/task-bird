import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import Tasks from './components/Tasks/';
import Navbar from './components/Navbar/';
import NewTask from './components/NewTask/';
import UpdateTask from './components/UpdateTask/';

function App() {
  return (
    <HashRouter>
        <Navbar Link={Link} />
        <Route exact path='/' component={Tasks} />
        <Route path='/new-task' component={NewTask} />
        <Route path='/update-task/:id' component={UpdateTask} />
    </HashRouter>
  );
}

export default App;
