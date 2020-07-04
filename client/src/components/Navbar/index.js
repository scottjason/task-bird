import React from 'react';
import './style.css';

const Navbar = ({ Link }) => {
  return (
    <nav className='navbar' role='navigation' aria-label='navigation'>
      <div className='logo-wrap'>
        <Link to='/' className='navbar-item'>
          Task Bird
        </Link>
      </div>

      <div className='navbar-right'>
        <Link to='/new-task' className='navbar-item'>
          New Task
        </Link>
        <Link to='/' className='navbar-item'>
          Tasks
        </Link>
      </div>
    </nav>
  );
};
        
export default Navbar;        
