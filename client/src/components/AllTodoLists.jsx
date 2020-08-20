import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import API from '../service/api';
import TodoList from './TodoList';

const useStyles = makeStyles({
 container: {
  maxWidth: 630,
  width: '100%',
  margin: '0 auto',
  padding: '55px 15px 25px',
  marginTop: 100,
 },
 inputBlock: {
  display: 'flex',
  marginBottom: 30,
  justifyContent: 'space-between',
 },
 input: {
  width: '75%',
 },
});
const AllTodoLists = (props) => {
 const classes = useStyles();
 const [todoLists, setTodoLists] = useState([]);
 const [loading, setIsLoading] = useState(false);
 const [todolistName, setTodolistName] = useState('');

 const loadData = useCallback(async () => {
  setIsLoading(true);
  const data = await API.getAllTodoLists();

  setTodoLists(data);
  setIsLoading(false);
 }, []);

 useEffect(() => {
  loadData();
 }, [loadData]);

 const handleChange = (e) => {
  setTodolistName(e.target.value);
 };

 const handleCreateTodoList = async (e) => {
  e.preventDefault();
  await API.createTodoList({ listName: todolistName });
  await loadData();
  setTodolistName('');
 };

 return (
  <div className={classes.container}>
   <div className={classes.inputBlock}>
    <TextField
     className={classes.input}
     name='text'
     onChange={handleChange}
     value={todolistName}
     variant='outlined'
     label='Create Todolist'
    />
    <Button onClick={handleCreateTodoList} variant='contained' color='primary'>
     Add TodoList
    </Button>
   </div>
   {loading ? (
    <div>Loading...</div>
   ) : todoLists.length === 0 ? (
    <div>This List is empty. You can create todo list</div>
   ) : (
    todoLists.map((todoList) => (
     <TodoList todoList={todoList} key={todoList._id} loadData={loadData} />
    ))
   )}
  </div>
 );
};

export default AllTodoLists;
