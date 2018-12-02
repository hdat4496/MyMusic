import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../../actions/authAction';
import URL from '../../../helpers/url';
import NotificationAlert from 'react-notification-alert';
const _url = 'http://localhost:10010';

class Register extends Component {

  handleSignup = (e) => {
    e.preventDefault();
    var username = this.username.value;
    var fullname = this.fullname.value;
    var password = this.password.value;
    var confirmPassword = this.confirmPassword.value;
    
    var self = this;
    if (password===confirmPassword) {
      axios.post(_url + '/user/signup', {
        user_info_signup: {
          username: username,
          fullname: fullname,
          password: password
        }
      }).then(function (res) {
        if (res.data.status === 200) {
          const { username, token } = res.data;
          var obj = { username, token };
          self.props.login(obj);
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          self.props.history.push(URL.HOME);
        }
        else {
          const options_noti = {
            place: 'tr',
            message: res.data.message,
            type: 'danger',
            autoDismiss: 3,
          }
          self.refs.notificationAlert.notificationAlert(options_noti);
        }

      })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      const options_pass = {
        place: 'tr',
        message: 'Two passwords that you enter is inconsistent!',
        type: 'danger',
        autoDismiss: 3,
      }
      self.refs.notificationAlert.notificationAlert(options_pass);
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <NotificationAlert ref="notificationAlert" />
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSignup}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required innerRef={(node) => this.username = node} type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-id-card-o "></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required innerRef={(node) => this.fullname = node} type="text" placeholder="Fullname" autoComplete="fullname" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required innerRef={(node) => this.password = node} type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required innerRef={(node) => this.confirmPassword = node} type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  login: (authObj) => dispatch(login(authObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
