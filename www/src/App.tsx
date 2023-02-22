import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Calendar } from 'rsuite';
import Frame from './components/Frame';
import DashboardPage from './pages/dashboard';
import Error404Page from './pages/authentication/404';

import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import GeneralPage from './pages/settings/general/general'

import { appNavs } from './config';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Frame navs={appNavs} />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="general-settings" element={<GeneralPage />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default App;
