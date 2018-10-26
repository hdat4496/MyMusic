import React, { Component } from 'react';
import {
  AppAside,
  AppFooter,
  AppHeader,
} from '@coreui/react';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import PageMain from '../../views/Pages/PageMain/PageMain'

class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <PageMain />
          <AppAside fixed>
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>






      // <div className="app">
      //   <AppHeader fixed>
      //     <DefaultHeader />
      //   </AppHeader>
      //   <div className="app-body">
      //     <AppSidebar fixed display="lg">
      //       <AppSidebarHeader />
      //       <AppSidebarForm />
      //       <AppSidebarNav navConfig={navigation} {...this.props} />
      //       <AppSidebarFooter />
      //       <AppSidebarMinimizer />
      //     </AppSidebar>
      //     <main className="main">
      //       <AppBreadcrumb appRoutes={routes}/>
      //       <Container fluid>
      //         <Switch>
      //           {routes.map((route, idx) => {
      //               return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
      //                   <route.component {...props} />
      //                 )} />)
      //                 : (null);
      //             },
      //           )}
      //           <Redirect from="/" to="/dashboard" />
      //         </Switch>
      //       </Container>
      //     </main>
      //     <AppAside fixed>
      //       <DefaultAside />
      //     </AppAside>
      //   </div>
      //   <AppFooter>
      //     <DefaultFooter />
      //   </AppFooter>
      // </div>
    );
  }
}

export default DefaultLayout;
