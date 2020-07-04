import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import './style.css';

const GET_ALL_TASKS = gql`
  {
    allTasks {
      title
      content
      _id
      date
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($_id: ID!) {
    deleteTask(_id: $_id) {
      title
      content
      _id
      date
    }
  }
`;

const Tasks = () => {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      const { allTasks } = cache.readQuery({ query: GET_ALL_TASKS });
      const newTasks = allTasks.filter((task) => task._id !== deleteTask._id);
      
      cache.writeQuery({
        query: GET_ALL_TASKS,
        data: { allTasks: newTasks },
      });
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
        <div className='notes-container'>
          {data.allTasks.map((task) => (
              <div 
                key={task._id}
                className='note-wrap'>
                <header className='note-header'>
                  <p className='note-title'>{task.title}</p>
                </header>
                <div className='content-wrap'>
                    {task.content}
                </div>
                <footer className='note-footer'>
                  <Link to={`note/${task._id}`} className='note-footer-item'>
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteTask({ variables: { _id: task._id } });
                    }}
                    className='note-footer-item'
                  >
                    Delete
                  </button>
                </footer>
              </div>
          ))}
        </div>
  );
};

export default Tasks;
