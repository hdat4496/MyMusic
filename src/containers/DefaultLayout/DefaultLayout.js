import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import avatar from '../../assets/img/brand/avatar.jpg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import logoicon from '../../assets/img/brand/logo_icon.png'
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppAsideToggler, AppHeaderDropdown, AppNavbarBrand

} from '@coreui/react';
import DefaultFooter from './DefaultFooter';
// routes config
import routes from '../../routes';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/authAction';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, InputGroup, InputGroupAddon, Button, Input, Form } from 'reactstrap';

class DefaultLayout extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.props.logout();
    this.props.history.push('/login');
  }

  componentWillMount() {
    const { auth } = this.props;

    if (auth.token.length === 0) {
      // const getAuth = $.getAuthentication();
      var user = localStorage.getItem("username");
      var token = localStorage.getItem("token");
      if (user && token) {
        this.props.login({
          user: user,
          token: token
        });
      }
    }
  }

  handleSearch= ()=>{
    const keyword = this.keyword.value;
    const urlCurrent = window.location.href;
    if(keyword!==''){
      this.props.history.push(`/search?keyword=${keyword}`);
    }
    if (urlCurrent.includes('search')){
      window.location.reload();
    }
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
};
  render() {
    const { auth } = this.props;
    return (
      <div className="app">
        <AppHeader fixed>
          <React.Fragment>
            <AppNavbarBrand
              full={{ src: logoicon, width: 50, height: 40, alt: 'Music Logo' }}
              minimized={{ src: sygnet, width: 30, height: 30, alt: 'Music Logo' }}
            />
            <Nav className="d-md-down-none" navbar>
              <NavItem className="px-3">
                <NavLink href="/" >Home</NavLink>
              </NavItem>
              <NavItem className="px-3">
                <NavLink href="/chart">Chart</NavLink>
              </NavItem>
            </Nav>

              <InputGroup style={{ margin: 'auto', width: '60%' }}>
                <InputGroupAddon addonType="prepend">
                  <Button  onClick={this.handleSearch} type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                </InputGroupAddon>
                <Input onKeyPress={this.handleKeyPress} innerRef={(node) => this.keyword = node} type="text" id="input1-group2" name="input1-group2" placeholder="Please input song name or artist" />
              </InputGroup>

            {this.props.auth.token.length > 0 ? <Nav className="ml-auto" navbar>
              <AppHeaderDropdown direction="down">
                <DropdownToggle nav>
                  <img src={avatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
                </DropdownToggle>
                <DropdownMenu right style={{ right: 'auto' }}>
                  <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                  <DropdownItem onClick={() => {
                    this.props.history.push('/profile');
                  }} ><i className="fa fa-user"></i> Profile</DropdownItem>
                  <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                  <DropdownItem onClick={this.handleLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </DropdownMenu>
              </AppHeaderDropdown>
            </Nav> : ''}


          </React.Fragment>

        </AppHeader>
        <div className="app-body">
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
                {/* <Redirect from="/" to="/home" /> */}
              </Switch>
            </Container>
          </main>
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
const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  login: (authObj) => dispatch(login(authObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);