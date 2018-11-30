import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../../actions/authAction';
import URL from '../../../helpers/url';

const _url = 'http://localhost:10010';

class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    
    var username = this.username.value;
    var password = this.password.value;
    var self=this;

    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
        axios.post(_url + '/user/login', {
          user_info: {
            username: username,
            password: password
          }
        }).then(function (res) {
          if (res.data.status === 200) {
            const { username, token } = res.data;
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            var obj = { username, token };
            self.props.login(obj);
            self.props.history.push(URL.HOME);
          } 
        })
          .catch(function (error) {
            console.log(error);
          });
    //   }
    // });
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleLogin}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input innerRef={(node) => this.username = node} type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input innerRef={(node) => this.password = node} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="12" style={{textAlign:'center'}}>
                          <Button style={{width:'100%'}} color="primary" className="px-4">Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button onClick={()=> {
                        this.props.history.push(URL.REGISTER);
                      }}  color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);


