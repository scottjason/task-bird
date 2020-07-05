import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './style.css';

const NEW_TASK = gql`
  mutation createTask($title: String!, $content: String!) {
    createTask(input: { title: $title, content: $content }) {
      _id
      title
      content
      date
    }
  }
`;

const GET_TASKS = gql`
  {
    allTasks {
      title
      content
      _id
      date
    }
  }
`;

const NewTask = withRouter(({ history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createTask] = useMutation(NEW_TASK, {
    update(cache, { data: { createTask } }) {
      const { allTasks } = cache.readQuery({ query: GET_TASKS });

      cache.writeQuery({
        query: GET_TASKS,
        data: { allTasks: allTasks.concat([createTask]) },
      });
    },
  });

  return (
    <div className='new-task-container'>
      <div className='new-task-wrap'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTask({
              variables: {
                title,
                content,
                date: Date.now(),
              },
            });
            history.push('/');
          }}
        >
          <div className='field'>
            <label className='label'>Task Title</label>
              <input
                className='new-task-input'
                name='title'
                type='text'
                placeholder='Task Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
          </div>

          <div className='field'>
            <label className='label'>Task Content</label>
              <textarea
                className='textarea'
                name='content'
                rows='10'
                placeholder='Task Content here...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
          </div>

          <div className='field'>
              <button className='submit-btn'>submit</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default NewTask;
