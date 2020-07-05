import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './style.css';

const GET_TASK = gql`
  query getTask($_id: ID!) {
    getTask(_id: $_id) {
      _id
      title
      content
      date
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask($_id: ID!, $title: String, $content: String) {
    updateTask(_id: $_id, input: { title: $title, content: $content }) {
      _id
      title
      content
    }
  }
`;

const UpdateTask = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK);

  if (loading) return <div>Fetching task</div>;
  if (error) return <div>Error fetching task</div>;

  const task = data;

  return (
    <div className='update-container'>
      <div className='update-form-wrap'>
        <form
          onSubmit={(e) => {
            e && e.preventDefault();

            updateTask({
              variables: {
                _id: task.getTask._id,
                title: title ? title : task.getTask.title,
                content: content ? content : task.getTask.content,
              },
            });
            history.push('/')
          }}
        >
          <div className='field'>
            <label className='label'>Update Title</label>
              <input
                className='update-input'
                type='text'
                name='title'
                placeholder='Note Title'
                defaultValue={task.getTask.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
          </div>

          <div className='field'>
            <label className='label'>Update Content</label>
              <textarea
                className='textarea'
                rows='10'
                name='content'
                placeholder='Update task content here...'
                defaultValue={task.getTask.content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
          </div>

          <div className='field'>
            <button className='save-btn'>save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(UpdateTask);
