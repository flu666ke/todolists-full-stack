import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles, TextField, Button } from '@material-ui/core';

import API from '../service/api';
import Task from './Task';

const useStyles = makeStyles({
  container: {
    maxWidth: 630,
    width: '100%',
    margin: '0 auto',
    padding: '55px 15px 25px',
    marginTop: 100,
  },
  itemWrapper: {
    display: 'block',
    marginBottom: 30,
    border: '1px black solid',
    boxShadow: '2px 3px 6px 1px black',
  },
  item: {
    color: 'black',
    '&:hover': {
      color: 'blue',
    },
    display: 'block',
    marginTop: 30,
    width: 140,
    boxShadow: '2px 3px 6px 1px black',
    padding: 10,
  },
  inputBlock: {
    display: 'flex',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
  },
  input: {
    width: '75%',
  },
  dateField: {
    width: 160,
    marginBottom: 30,
  },
});
const Tasks = (props) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    text: '',
    date: '2020-08-20',
  });

  const { text, date } = values;
  const { id } = useParams();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const data = await API.getAllTasks(id);

    setTasks(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await API.createTask({ text, date }, id);
    await loadData();
    setValues({ ...values, text: '' });
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleCreateTask}>
        <div className={classes.inputBlock}>
          <TextField
            className={classes.input}
            name="text"
            onChange={handleChange('text')}
            value={text}
            variant="outlined"
            label="Enter Task"
          />

          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </div>
        <TextField
          className={classes.dateField}
          id="date"
          label="Date"
          type="date"
          onChange={handleChange('date')}
          defaultValue={date}
        />
      </form>
      {tasks.length === 0 ? (
        <div>This Todo List is empty</div>
      ) : (
        tasks.map((task) => (
          <Task task={task} key={task._id} loadData={loadData} />
        ))
      )}
      <Link className={classes.link} to="/todo-list">
        <div className={classes.item}>Back to todo lists</div>
      </Link>
    </div>
  );
};

export default Tasks;
