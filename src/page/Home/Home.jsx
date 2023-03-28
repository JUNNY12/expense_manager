import React, { useState, useEffect } from 'react';
import Content from './Content';
import Cost from './Cost';
import Nav from '../../component/Nav';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Loader from '../../component/Loader';

const Home = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [authenticated, setAuthenticated] = useState(false);

  //redirect to login if user is not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
    setAuthenticated(user ? true : false);
  }, [user, loading, navigate]);

  //show loader if loading
  if (loading) {
    return <Loader />;
  }

  //retuen null if user is not authenticated to prevent glitch of showing home page
  if (!authenticated) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className='homeContainer'>
        <div>
          <Content />
          <Cost />
        </div>
      </div>
    </>
  );
};

export default Home;
