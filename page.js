'use client';

import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';

export default function Home() {
  // this state holds the text in the input
  const [task, setTask] = useState('');
    // and this one holds all the todos
  const [todos, setTodos] = useState([]);

  // this function runs when the input changes
  const handleInputChange = (e) => {
    setTask(e.target.value); // update the 'task' state
  };

  // this is for when i click the add button
  const handleAddTask = () => {
    // only add if the input isn't just spaces
    if (task.trim() != '') {
      const newTask = {
        id: Date.now(), // simple way to get a unique ID
        text: task,
        completed: false, 
      };
        // add the new task to the todos array
      setTodos([...todos, newTask]);
      // clears the input field
      setTask('');
    }
  };

  // this happens when the checkbox changes
  const handleCheckboxChange = (id) => {
    // goes through all the todos
    setTodos(
      todos.map((todo) =>
        // if this is the todo that changed
        todo.id === id ?
        // make a new todo with the opposite completed status
        { ...todo, completed: !todo.completed } :
        // otherwise, keep the todo the same
        todo
      )
    );
  };

  // this is to delete a todo
  const handleDeleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // filter out the one i want to delete
  };

  // to clear all the finished ones
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed)); // keep only the not completed ones
  };

  // how many are done?
  const completedCount = todos.filter(todo => todo.completed).length;

  return (

    <div className="container mx-auto p-6 max-w-md bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">My Tasks</h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Add a new task..."
          className="mr-2 flex-grow"
          value={task}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()} // add on enter key
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>

      {/* shows a message if there are no tasks */}
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet!</p>
      ) : (
        <>
          {/* the list of todos */}
          <ul className="divide-y divide-gray-200 mb-4">
            {todos.map((todo) => (
              <li key={todo.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => handleCheckboxChange(todo.id)}
                    className="mr-3"
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`leading-tight ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(todo.id)}>
                  <Trash className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
          {/* button to clear completed tasks */}
          {completedCount > 0 && (
            <Button onClick={clearCompleted} variant="destructive" size="sm">
              Clear Completed ({completedCount})
            </Button>
          )}
        </>
      )}
    </div>
  );
}