export type Paths<T extends string> = {
  [key in T]: string;
};

export enum RootKeys {
  chats = 'chats',
}

export enum InnerKeys {
  chat = 'chat',
}

export interface RouteItem {
  id: keyof typeof RootKeys | keyof typeof InnerKeys;
  path: string;
  element: JSX.Element;
}
