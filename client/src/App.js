import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Tasks from './components/Tasks';
import AllTodoLists from './components/AllTodoLists';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/todo-list' component={AllTodoLists} />
        <Route
          exact
          path='/tasks/:id'
          component={Tasks}
        />
        <Redirect from='/' to='/todo-list' exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
