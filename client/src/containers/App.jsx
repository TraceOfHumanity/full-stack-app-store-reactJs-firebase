import { AdminLayout } from 'Layouts/AdminLayout';
import { AuthLayout } from 'Layouts/AuthLayout';
import { Layout } from 'Layouts/Layout';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authentication } from 'pages/Authentication';
import { Home } from 'pages/Home';
import { UserProfile } from 'pages/UserProfile';
import { AdminHome } from 'pages/admin/AdminHome';

// import { NewUser } from 'pages/admin/NewUser';

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:uid" element={<UserProfile />} />
        </Route>

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          {/* <Route path="newUser" element={<NewUser />} /> */}
        </Route>

        <Route path="/auth/*" element={<AuthLayout />}>
          <Route index element={<Authentication />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
