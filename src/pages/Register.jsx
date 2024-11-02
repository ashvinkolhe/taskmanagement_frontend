/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from '../components/Banner/Banner';
import Register from '../components/Register/Register';

const register = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Banner />
        <Register />
      </div>
    </>
  );
};

export default register;