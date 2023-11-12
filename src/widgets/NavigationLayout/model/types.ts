export interface NavigationRoute extends Route {
  subRoutes: Route[];
}

export interface Route {
  pattern: RegExp;
  label?: string;
  href?: string;
  withBack?: boolean;
  hrefFn?: (pathname: string) => string;
}
