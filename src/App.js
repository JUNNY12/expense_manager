import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Loader from './component/Loader';
import { Route } from './config/Route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Route />
      <ToastContainer />
    </Suspense>
  );
};

export default App;
