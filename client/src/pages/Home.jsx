import { auth } from 'config/firebase.config';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Home = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      toast.success('Sign out successful');
      navigate('/auth', { replace: true });
    })
  }
  return <div>Home

    <button onClick={handleSignOut}>Sign out</button>
  </div>;
};
