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
import { connect } from 'react-redux';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
//=============================//===================
const _url = 'http://localhost:10010';
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

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}





class Home extends Component {
  // state = {

  // };
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      expanded: false,
      homeTrack: [],
      homeChartVal: '',
      chartLabel : [],
      chartData : []
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


    await axios.get(_url + '/chart/get-report-home', {
      params: {
        key: this.props.auth.token
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        self.setState({
          ...self.state,
          homeChartVal: res.data.value,
        });
        console.log(res.data)
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
    const { homeTrack, activeIndex, homeChartVal } = this.state;
    const homeTrack_1 = homeTrack.slice(0, 4);
    const homeTrack_2 = homeTrack.slice(4);
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

    if(homeChartVal){
      const line = {
        labels: homeChartVal.data.label,
        datasets: [
          {
            label: homeChartVal.featureName,
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
            data: homeChartVal.data.data,
          },
        ],
      };

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
                    <Col xs="6" sm="6" style={{ display: 'flex' }}>
                      <Card style={{ width: '100%', marginBottom: '0px' }}>
                        <CardBody>
                          {homeChartVal.genreName}
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
                                <div>
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
                                <div>
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
                    <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                      <CarouselIndicators items={items} activeIndex={1} onClickHandler={this.goToIndex} />
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
    } else { return '';}
    
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
