import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Jumbotron,
  // Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { connect } from 'react-redux';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//=============================//===================
const _url = 'http://localhost:10010';
const items = [
  {
    src: '/assets/img/cover/cover_image_2.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: '/assets/img/cover/cover_image_4.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: '/assets/img/cover/cover_image_3.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      expanded: false,
      homeTrack: [],
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount = async () => {
    var self = this;
    await axios.get(_url + '/track/get-home-track', {
      params: {
        token: this.props.auth.token
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        self.setState({
          ...self.state,
          homeTrack: res.data.value
        });
      } else {
        console.log(res.data.message);
      }

    })
      .catch(function (error) {
        console.log(error);
      });

  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClickTrack(id) {
    this.props.history.push(`/track/${id}`)
  }
  render() {
    const { homeTrack, activeIndex } = this.state;
    const homeTrack_1 = homeTrack.slice(0, 4);
    const homeTrack_2 = homeTrack.slice(4);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody>
                <Row>
                  <Col xs="5" sm="5" style={{ display: 'flex' }}>
                    <Jumbotron style={{ marginBottom: '0px', paddingTop: '50px', paddingBottom: "50px" }}>
                      <h1 style={{ fontSize: '70px' }}>Music trend</h1>
                      <h1 >in your hand</h1>
                      <p className="lead">Present many music feature of hit songs and predict if a song will be a hit vernus. That's so awesome!</p>
                      <Row style={{ marginTop: '30px auto' }}>
                        <Col xs="5" sm="3">
                          <Button block color="primary" onClick={() => {
                            this.props.history.push('/chart');
                          }} className="btn-pill">Let's start</Button>
                        </Col>
                        <Col xs="5" sm="3">
                          {this.props.auth.token.length == 0 ? <Button block outline color="primary" className="btn-pill" onClick={() => {
                            this.props.history.push('/login');
                          }}> Sign in</Button> : ''}

                        </Col>
                      </Row>
                    </Jumbotron>
                  </Col>
                  <Col xs="7" sm="7" style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', marginBottom: '0px', }}>
                      <CardBody>
                        <Carousel autoPlay showStatus={false} infiniteLoop={true} width={'100%'}  >
                          {homeTrack_1.map((e, i) => {
                            return <div key={e}>
                              <img style={{ maxHeight: "400px" }} src={e.track_imageurl} />
                              <p className="legend"><p style={{fontSize:'30px'}}>{e.title}</p>
                                {e.artist}</p>
                            </div>
                          })}
                          {homeTrack_2.map((e, i) => {
                            return <div key={e}>
                              <img style={{ maxHeight: "400px" }} src={e.track_imageurl} />
                              <p className="legend"><p style={{fontSize:'30px'}}>{e.title}</p>
                                {e.artist}</p>
                            </div>
                          })}
                        </Carousel>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className='list-audio' xs="12" sm="12">
            <Card style={{ width: '100%' }}>
              <CardBody>
                <Row>
                  {homeTrack_1.map((e, i) => {
                    return <Col key={e.id} xs="3" sm="3" className='audio-item'>
                      <Card style={{ width: '100%' }} onClick={() => {
                        this.handleClickTrack(e.id);
                      }} >
                        <CardHeader className='audio-item-header'>
                          <img style={{ width: '100%' }} src={e.track_imageurl} alt="Music" />
                        </CardHeader>
                        <CardBody className='audio-item-body'>
                          <Row>
                            <Col xs="3" sm="3" className='audio-item-body-avatar'>
                              <img src={e.artist_imageurl} className="img-avatar" alt="avatar" />
                            </Col>
                            <Col xs="9" sm="9" className='audio-item-body-info' >
                              <div style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                maxWidth: '90%',
                                whiteSpace: 'nowrap'
                              }}>
                                <span>
                                  <b>{e.title}</b>
                                </span>
                                <br />
                                <span>
                                  {e.artist}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  })}
                  {homeTrack_2.map((e, i) => {
                    return <Col key={e.id} xs="3" sm="3" className='audio-item'>
                      <Card style={{ width: '100%' }} onClick={() => {
                        this.handleClickTrack(e.id);
                      }}>
                        <CardHeader className='audio-item-header'>
                          <img style={{ width: '100%' }} src={e.track_imageurl} alt="Music" />
                        </CardHeader>
                        <CardBody className='audio-item-body'>
                          <Row>
                            <Col xs="3" sm="3" className='audio-item-body-avatar'>
                              <img src={e.artist_imageurl} className="img-avatar" alt="avatar" />
                            </Col>
                            <Col xs="9" sm="9" className='audio-item-body-info' >
                              <div style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                maxWidth: '90%',
                                whiteSpace: 'nowrap'
                              }}>
                                <span>
                                  <b>{e.title}</b>
                                </span>
                                <br />
                                <span>
                                  {e.artist}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody>
                <Col xs="12" xl="12">

                </Col>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );

  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
