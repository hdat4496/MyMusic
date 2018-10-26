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
    );
  }
}

export default DefaultLayout;
