import { auth } from 'config/firebase.config';

import { baseURL } from 'utils/helpers';

export const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then(async (token) => {
          await fetch(`${baseURL}/validateUserJWTToken`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (!res.ok) {
                reject(
                  new Error(`Network response was not ok: ${res.statusText}`),
                );
              }
              return res.json();
            })
            .then((data) => {
              resolve(data?.user);
            });
        });
      } else {
        reject(new Error('User is not authenticated'));
      }
      unsubscribe();
    });
  });
};
