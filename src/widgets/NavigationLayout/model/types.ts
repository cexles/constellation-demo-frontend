export interface Route {
  pattern: RegExp;
  label?: string;
  href?: string;
  withBack?: boolean;
  keep?: boolean;
  hrefFn?: (pathname: string) => string;
}

export interface NavigationRoute extends Route {
  subRoutes?: Route[];
}
