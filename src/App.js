import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { RoutesConfig, Routes } from './config/routes';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import Loader from './component/Loader';


const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RoutesConfig />
      <ReactRoutes>
        {Routes().map((route, index) => {
          return <Route key={route.path} path={route.path} element={route.element} />;
        })}
      </ReactRoutes>
    </Suspense>
  );
};

export default App;
