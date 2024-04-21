import { auth } from 'config/firebase.config';

import { baseURL } from 'utils/helpers';

export const getAuthenticatedUser = () => {
  let userData;
  const unsubscribe = auth.onAuthStateChanged((userCred) => {
    if (userCred) {
      userCred.getIdToken().then(async (token) => {
        // console.log('Token: ', token);
        await fetch(`${baseURL}/validateUserJWTToken`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              console.log('Error on fetching');
            }
            return res.json();
          })
          .then((data) => {
            console.log('Data: ', data);
          });
      });
    }
  });

  return () => {
    unsubscribe();
  };
};
