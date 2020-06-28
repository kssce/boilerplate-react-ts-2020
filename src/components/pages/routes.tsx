import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>loading...</div>;

export interface RouterType {
  name: string;
  uri: string;
  component: any;
}

const rootRouter: RouterType = {
  name: '/',
  uri: '/',
  component: null,
};

const notFoundRouter: RouterType = {
  name: 'Not found',
  uri: '/not-found',
  component: Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
  }),
};

const boardListRouter: RouterType = {
  name: 'Board list',
  uri: '/board',
  component: Loadable({
    loader: () => import('../board/BoardList'),
    loading: Loading,
  }),
};

const aboutRouter: RouterType = {
  name: 'About',
  uri: '/about',
  component: Loadable({
    loader: () => import('../about/About'),
    loading: Loading,
  }),
};

export { rootRouter, notFoundRouter, boardListRouter, aboutRouter };
