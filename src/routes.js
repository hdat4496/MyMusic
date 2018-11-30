import React from 'react';
import Loadable from 'react-loadable'
import URL from './helpers/url';
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Track = Loadable({
  loader: () => import('./views/Track'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./views/Profile'),
  loading: Loading,
});

const Chart = Loadable({
  loader: () => import('./views/Chart'),
  loading: Loading,
});

const Home = Loadable({
  loader: () => import('./views/Home'),
  loading: Loading,
});

const SearchLayout = Loadable({
  loader: () => import('./views/SearchLayout'),
  loading: Loading,
});


const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});


const routes = [
  { path: URL.HOME, exact: true, name: 'Home', component: Home },
  { path: URL.TRACK, name: 'track', component: Track },
  { path: URL.CHART, name: 'chart', component: Chart },
  { path: URL.PROFILE, name: 'profile', component: Profile },
  // { path: '/home', name: 'home', component: Home },
  { path: '/search', name: 'SearchLayout', component: SearchLayout },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
