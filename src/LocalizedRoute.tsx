/*eslint no-redeclare: "off" */

import { History as IHistory } from 'history';
import * as React from 'react';
import {
  Route,
  RouteComponentProps as IRouteComponentProps,
  RouteProps as IRouteProps,
} from 'react-router-dom';
import { localizer } from './localizer';
import { Translator } from './Translator';

interface IProps extends IRouteProps {
  localize?: boolean; // * default true
  children?: any; // ! Patch to eliminate TypeScript false positive error: no call signature on children
}

/**
 * A custom intercepted Route component
 * Docs: https://github.com/ReactTraining/react-router/blob/59a4fbc184f3a3cf4c25ee39a7e97f72efed7849/packages/react-router/modules/Route.js#L112-L116
 * @param props
 */
const LocalizedRoute: React.FunctionComponent<IProps | any> = (props) => {
  const {
    children,
    component: Component,
    localize = true,
    render,
    exact,
    path,
    ...rest
  } = props;

  const interceptHistory = (history: IHistory, language: string) => {
    const push = (pushedUrl: string) => {
      const localizedUrl: string = localizer.getLocalizedRoute(
        language,
        pushedUrl
      );
      history.push(localizedUrl);
    };

    return {
      ...history,
      push,
    };
  };

  const interceptProps = (
    routeComponentProps: IRouteComponentProps | any,
    language: string
  ) => {
    return {
      ...routeComponentProps,
      history: interceptHistory(routeComponentProps.history, language),
    };
  };

  const getInterceptedPath = (): string | string[] | undefined => {
    if (path && localize) {
      return localizer.getLocalizedPath(path);
    }
    if (path) {
      return path;
    }

    return undefined;
  };

  return (
    <Translator
      render={(language: string) => {
        return (
          <Route
            path={getInterceptedPath()}
            exact={exact}
            history={history}
            render={(renderRouteProps: IRouteComponentProps) => {
              if (Component) {
                return (
                  <Component {...interceptProps(renderRouteProps, language)} />
                );
              }
              if (render) {
                return render(interceptProps(renderRouteProps, language));
              }
              if (typeof children === 'function') {
                return children(renderRouteProps);
              }

              return null;
            }}
            {...rest}
          />
        );
      }}
    />
  );
};

export { LocalizedRoute, IProps as ILocalizedRouteProps };
