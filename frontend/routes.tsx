import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, IndexRouteObject, NonIndexRouteObject, useMatches } from 'react-router-dom';

const DependenciaView = lazy(async () => import('Frontend/views/todo/DependenciaView.js'));
const EdificioView = lazy(async () => import('Frontend/views/todo/EdificioView.js'));

export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
  {
    element: <MainLayout />,
    handle: { icon: 'null', title: 'Main' },
    children: [{ path: '/Edificio', element: <EdificioView />, handle: { icon: 'list-alt-solid', title: 'Edificios' } },
    { path: '/Dependencia', element: <DependenciaView />, handle: { icon: 'list-alt-solid', title: 'Dependencias' } }],
    
  },
];

const router = createBrowserRouter([...routes]);
export default router;
