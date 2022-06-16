import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/sass/main.scss";

import Pages from './pages/index';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import {
  ApolloProvider,
} from "@apollo/client";
import { client } from './grapql/apollo';

document.title = 'Welcome | Utu Wallet';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Pages />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
