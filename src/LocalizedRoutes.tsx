import * as React from 'react';
import { RedirectProps as IRedirectProps, Switch } from 'react-router-dom';
import { LocalizedRedirect } from './LocalizedRedirect';
import { ILocalizedRouteProps, LocalizedRoute } from './LocalizedRoute';
import { localizer } from './localizer';
import { Translator } from './Translator';

type Route = ILocalizedRouteProps | IRedirectProps | { routes: Route[] };

interface IProps {
  applySwitch?: boolean; // * Wrap config with switch. default = false
  localize?: boolean; // * default true
  // routes: Array<ILocalizedRouteProps | IRedirectProps>; // TODO Add nested routes support
  routes: Route[];
}

/**
 * * Intepretes route config
 * @param props
 */
const LocalizedRoutes: React.FunctionComponent<IProps> = props => {
  const {
    applySwitch = false,
    routes = [],
    localize: localizeRouteConfig = true
  } = props;

  const getConfig = (config: Route[]) =>
    config.map(
      (route: ILocalizedRouteProps | IRedirectProps | any, index: number) => {
        const {
          children,
          component,
          exact,
          from,
          location,
          path,
          push,
          render,
          sensitive,
          strict,
          localize = localizeRouteConfig === false ? false : true,
          to,
          routes: nestedRoutes
        } = route;
        const isRedirect: boolean = to ? true : false;

        const resolveRedirectFrom = (language: string) => {
          if (localize) {
            return localizer.getLocalizedRoute(language, from);
          }
          if (localizeRouteConfig) {
            return localizer.getLocalizedRoute(language, from);
          }
          return from;
        };

        const resolvePath = () => {
          // * Singular localize setting passed in config should take presedence
          if (localize) {
            return localizer.getLocalizedPath(path);
          }
          // * localize config passed as Config prop takes 2nd stage
          if (localizeRouteConfig) {
            return localizer.getLocalizedPath(path);
          }
          return path;
        };

        if (isRedirect) {
          return (
            <React.Fragment key={index}>
              <Translator
                render={(language: string) => (
                  <LocalizedRedirect
                    from={resolveRedirectFrom(language)}
                    localize={
                      localize === false
                        ? false
                        : localize || localizeRouteConfig
                    }
                    {...{ to, push, path, exact, strict, localize }}
                  />
                )}
              />
            </React.Fragment>
          );
        }

        if (path || component || render) {
          return (
            <LocalizedRoute
              key={index}
              path={resolvePath()}
              {...{ children, location, render, sensitive, component, exact }}
            >
              {nestedRoutes && getConfig(nestedRoutes)}
            </LocalizedRoute>
          );
        }

        return null;
      }
    );

  const routeConfig = getConfig(routes);

  if (applySwitch) {
    return <Switch>{routeConfig}</Switch>;
  }

  return <>{routeConfig}</>;
};

export { LocalizedRoutes, Route };
