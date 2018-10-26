import React, { Component } from 'react';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Container } from 'reactstrap';
import routes from '../../../routes';


class PageMain extends Component {
  render() {
    return (
      <main className="main">
      <AppBreadcrumb appRoutes={routes}/>
      <Container fluid>
        <Switch>
          {routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                  <route.component {...props} />
                )} />)
                : (null);
            },
          )}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Container>
    </main>
    );
  }
}

export default PageMain;
