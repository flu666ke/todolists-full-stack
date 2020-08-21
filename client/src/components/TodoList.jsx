import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';

import API from '../service/api';

const useStyles = makeStyles({
  itemWrapper: {
    display: 'flex',
    marginBottom: 30,
  },
  item: {
    color: 'black',
    '&:hover': {
      color: 'blue',
    },
    border: '1px black solid',
    boxShadow: '1px 2px 6px 1px black',
    padding: 7,
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    marginRight: 10,
  },
});

const TodoList = ({ todoList, loadData }) => {
  const { listName, _id } = todoList;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const handleDeleteTodoList = async () => {
    setLoading(true);
    await API.deleteTodoList(_id);
    await API.deleteTasks(_id);
    await loadData();
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.itemWrapper}>
          <Link className={classes.link} to={`/tasks/${_id}`}>
            <div className={classes.item}>{listName}</div>
          </Link>

          <Button
            onClick={handleDeleteTodoList}
            variant="contained"
            color="secondary"
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      )}
    </>
  );
};

TodoList.propTypes = {
  listName: PropTypes.string,
  _id: PropTypes.string,
  loadData: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  listName: null,
  _id: null,
};

export default TodoList;
