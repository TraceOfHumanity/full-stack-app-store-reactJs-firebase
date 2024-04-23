import { auth } from 'config/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useUser } from 'hooks/user/useUser';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();

  const { data: user , isLoading, isError, refetch } = useUser();
  const navigate = useNavigate();
  console.log("user", user);
  console.log("isLoading", isLoading);

  useEffect(() => {
    if (!isLoading && user ) {
      navigate('/', { replace: true });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div>Loading.......</div>;
  }

  const handleLoginAction = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      if (userCred) {
        console.log(userCred);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };



  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/loginBg.jpg)',
      }}
    >
      <div className="flex flex-col gap-4 border p-2 backdrop-blur-md">
        <h3 className="text-center">Welcome back!</h3>
        <p>Sign in to your account to continue</p>
        <button onClick={() => handleLoginAction()}>sign in with google</button>
      </div>
    </div>
  );
};
