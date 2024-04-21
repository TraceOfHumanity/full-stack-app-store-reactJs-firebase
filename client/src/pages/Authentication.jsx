import { auth } from 'config/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useUser } from 'hooks/user/useUser';
import React, { useCallback } from 'react';

export const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();

const {data} = useUser();

  const handleLoginAction = useCallback(async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      if (userCred) {
        console.log(userCred);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
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
