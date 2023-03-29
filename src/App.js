import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Loader from './component/Loader';
import { Route } from './config/Route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <Route />
        <ToastContainer />
      </Suspense>
    </Provider>
  );
};

export default App;
