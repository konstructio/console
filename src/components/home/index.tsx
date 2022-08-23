import React from 'react';

import { Container, Ray, Template } from './home.styled';

const Home = () => {
  return (
    <Container data-testid="home-component">
      <Template className="template-block">
        <div>
          <h3>React App Template</h3>
          <ul>
            <li>React (18.2.0)</li>
            <li>Redux Toolkit (1.8.4)</li>
            <li>Parcel (2.7.0)</li>
            <li>Storybook (6.5.10)</li>
            <li>Eslint - prettier</li>
          </ul>
        </div>
        <Ray alt="k-ray" />
      </Template>
    </Container>
  );
};

export default Home;
