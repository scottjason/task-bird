import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

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
    <div className='container m-t-20'>
      <h1 className='page-title'>New Task</h1>

      <div className='newnote-page m-t-20'>
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
            <div className='control'>
              <input
                className='input'
                name='title'
                type='text'
                placeholder='Task Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Task Content</label>
            <div className='control'>
              <textarea
                className='textarea'
                name='content'
                rows='10'
                placeholder='Task Content here...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <button className='button is-link'>submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default NewTask;
