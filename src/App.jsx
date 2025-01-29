import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Sparql, UserFetch, UserInfo } from 'components';
import { ErrorPage } from 'lib';

import { APP_CONFIG_JSON } from './constants';
import TelicentGraphiQL from './components/Graphiql/TelicentGraphiQL';

const App = () => (
  <BrowserRouter basename={`/${APP_CONFIG_JSON['uri-basename']}`}>
    <Routes>
      <Route path="/health" element={<h3>Hello I'm Telicent Query</h3>} />
      <Route path="/" element={<UserFetch />}>
        <Route path="/" element={<Sparql />} />
        <Route path="/graphiql" element={<TelicentGraphiQL />} />
      </Route>
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
