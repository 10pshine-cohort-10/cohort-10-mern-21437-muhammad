import React from 'react';
import PropTypes from 'prop-types';

function Header({ title = 'Notes App' }) {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
