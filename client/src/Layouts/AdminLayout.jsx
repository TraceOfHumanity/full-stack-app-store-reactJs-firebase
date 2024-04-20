import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div>
      <header>admin header</header>
      <Outlet />
      <footer>admin footer</footer>
    </div>
  );
};
