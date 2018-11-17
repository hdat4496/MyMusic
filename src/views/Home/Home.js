import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Jumbotron,
  Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


import { Line } from 'react-chartjs-2';
//=============================//===================

const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Tempo',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}





class Home extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0, expanded: false
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
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

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img className="d-block w-100" src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });

    const slides2 = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="d-block w-100" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody>
                <Row>
                  <Col xs="6" sm="6" style={{ display: 'flex' }}>
                    <Jumbotron style={{ marginBottom: '0px', paddingTop: '50px', paddingBottom: "50px" }}>
                      <h1 style={{ fontSize: '70px' }}>Music trend</h1>
                      <h1 >in your hand</h1>
                      <p className="lead">Present many music feature of hit songs and predict if a song will be a hit vernus. That's so awesome!</p>
                      <Row style={{ marginTop: '30px auto' }}>
                        <Col xs="5" sm="3">
                          <Button block color="primary" className="btn-pill">Let's start</Button>
                        </Col>
                        <Col xs="5" sm="3">
                          <Button block outline color="primary" className="btn-pill"> Sign in</Button>
                        </Col>
                      </Row>
                    </Jumbotron>
                  </Col>
                  <Col xs="6" sm="6" style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', marginBottom: '0px' }}>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Line data={line} options={options} />
                        </div>
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
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/beatifulinwhite.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/westlife.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>Beatiful in white.</b>
                              </span>
                              <br />
                              <span>
                                West life
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/everytime.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/a1.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>EveryTime</b>
                              </span>
                              <br />
                              <span>
                                A1
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/attention.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/charlieputh.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>Attention</b>
                              </span>
                              <br />
                              <span>
                                Charlie puth
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/untilyou.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/shayneward.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>Until you</b>
                              </span>
                              <br />
                              <span>
                                Shayne Ward
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/everyiloveyou.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/boyzone.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>Every i love you</b>
                              </span>
                              <br />
                              <span>
                                Boyzone
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/hungup.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/madonna.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>Hung Up</b>
                              </span>
                              <br />
                              <span>
                                Madonna
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/hotelcalifornia.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/eagels.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>Hotel California</b>
                              </span>
                              <br />
                              <span>
                                Eagles
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="3" sm="3" className='audio-item'>
                    <Card style={{ width: '100%' }}>
                      <CardHeader className='audio-item-header'>
                        <img style={{ width: '100%' }} src='/assets/img/song/youarenotalone.jpg' alt="Music" />
                      </CardHeader>
                      <CardBody className='audio-item-body'>
                        <Row>
                          <Col xs="3" sm="3" className='audio-item-body-avatar'>
                            <img src='/assets/img/singer/michaeljackson.jpg' className="img-avatar" alt="avatar" />
                          </Col>
                          <Col xs="9" sm="9" className='audio-item-body-info' >
                            <div>
                              <span>
                                <b>You are not alone</b>
                              </span>
                              <br />
                              <span>

                                Michael Jackson
                            </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
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

                  <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides2}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                  </Carousel>

                </Col>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
