import './index.css';
import {css, Global} from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const globalStyles = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }
`;
ReactDOM.render(
    <React.StrictMode>
        <Global styles={globalStyles}/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.info);
