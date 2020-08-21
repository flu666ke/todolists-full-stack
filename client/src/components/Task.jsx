import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogContent,
} from '@material-ui/core';

import API from '../service/api';
import { getFormattedDate } from '../service/utils';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  item: {
    color: 'black',
    '&:hover': {
      color: 'blue',
    },
    border: '1px black solid',
    boxShadow: '1px 2px 6px 1px black',
    padding: 7,
    width: '66%',
  },
  root: {
    position: 'relative',
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(255, 255, 255, .6)',
    },
  },
  paper: {
    minWidth: 800,
    boxShadow:
      '0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)',
  },
  contentRoot: {
    padding: '85px 75px',

    '&:first-child': {
      paddingTop: '85px',
    },
  },
  inputBlock: {
    display: 'flex',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: '75%',
  },
  textField: {
    width: 160,
    marginBottom: 10,
  },
});

const Task = ({ task, loadData }) => {
  const classes = useStyles();

  const { date, text, _id } = task;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    updatedText: '',
    updatedDate: '2020-08-20',
  });
  const { updatedText, updatedDate } = values;

  const handleDeleteTask = async () => {
    await API.deleteTask(_id);
    await loadData();
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    await API.updateTask({ text: updatedText, date: updatedDate }, _id);
    await loadData();
    setValues({ ...values, updatedText: '' });
    setOpen(false);
  };

  const handleOpen = () => {
    setValues({
      updatedText: text,
      updatedDate: date,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskUpdateWindow = (
    <form onSubmit={handleUpdateTask}>
      <div className={classes.inputBlock}>
        <TextField
          className={classes.input}
          name="updatedText"
          onChange={handleChange('updatedText')}
          value={updatedText}
          variant="outlined"
          label="Enter Task"
        />

        <Button type="submit" variant="contained" color="primary">
          Update Task
        </Button>
      </div>
      <TextField
        className={classes.textField}
        id="date"
        label="Date"
        type="date"
        onChange={handleChange('updatedDate')}
        defaultValue={getFormattedDate(updatedDate)}
      />
    </form>
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.item}>
        <b>{text} </b>
        <i>{getFormattedDate(date)}</i>
      </div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Update
      </Button>
      <Button onClick={handleDeleteTask} variant="contained" color="secondary">
        Delete
      </Button>

      <Dialog
        classes={{
          paper: classes.paper,
          root: classes.root,
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent
          classes={{
            root: classes.contentRoot,
          }}
        >
          {taskUpdateWindow}
        </DialogContent>
      </Dialog>
    </div>
  );
};

Task.propTypes = {
  text: PropTypes.string,
  _id: PropTypes.string,
  date: PropTypes.string,
  loadData: PropTypes.func.isRequired,
};

Task.defaultProps = {
  text: null,
  _id: null,
  date: null,
};

export default Task;
