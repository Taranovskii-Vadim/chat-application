import { lazy } from 'react';

import { InnerKeys, Paths, RootKeys, RouteItem } from './types';

const Chat = lazy(() => import('../pages/Chat'));
const General = lazy(() => import('../pages/General'));

const ROOT_PATH = '/';

const ROOT_PATHS: Paths<RootKeys> = {
  chats: `${ROOT_PATH}`,
};

const INNER_PATHS: Paths<InnerKeys> = {
  chat: `${ROOT_PATHS.chats}/:id`,
};

export const getRoutes = (): RouteItem[] => [
  { id: 'chat', path: INNER_PATHS.chat, element: <Chat /> },
  { id: 'chats', path: ROOT_PATHS.chats, element: <General /> },
];
