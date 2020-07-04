import React from 'react';
import loadable from '@loadable/component';

type Component = () => Promise<any>;

function ComponentWithFallback(component: Component) {
  return loadable(component, { fallback: <Loading /> });
}

function Loading() {
  return <div>loading...</div>;
}

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
  component: ComponentWithFallback(() => import('./NotFound')),
};

const boardListRouter: RouterType = {
  name: 'Board list',
  uri: '/board',
  component: ComponentWithFallback(() => import('../board/BoardList')),
};

const aboutRouter: RouterType = {
  name: 'About',
  uri: '/about',
  component: ComponentWithFallback(() => import('../about/About')),
};

export { rootRouter, notFoundRouter, boardListRouter, aboutRouter };
