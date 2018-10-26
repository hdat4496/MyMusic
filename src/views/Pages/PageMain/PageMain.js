import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import routes from '../../../routes';

class PageMain extends Component {
  render() {
    return (
      <main className="main">
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
