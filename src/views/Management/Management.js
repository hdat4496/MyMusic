import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Button, Table, Input, Form, InputGroup, InputGroupAddon, } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import dateFormat from 'dateformat';
import ADMIN from '../../helpers/useradmin'
import NotificationAlert from 'react-notification-alert';
const _url = 'http://localhost:10010';
//========================//=====================
class Management extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      enable: true,
      dataTrack: [],
      dataNewTrack: [],
      dataChart: [],
      dataTracks: [],
      trackDetail: '',
      genreCurrent: '',
      dateCurrent: ''
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  componentDidMount = async () => {
    var user = localStorage.getItem("username");
    var token = localStorage.getItem("token");
    var self = this;
    if (!user || !token || !ADMIN.includes(user)) {
      this.props.history.push('/404');
    } else {

      await axios.get(_url + '/track/get-coming-hit-track', {
        params: {
          key: ''
        }
      }).then(function (res) {
        if (res.data.status === 200) {
          console.log(res.data);
          self.setState({
            ...self.state,
            dataNewTrack: res.data.value
          });
        } else {
          console.log(res.data.message);
        }

      })
        .catch(function (error) {
          console.log(error);
        });

      await axios.get(_url + '/chart/get-all-chart', {
        params: {
          token: ''
        }
      }).then(function (res) {
        if (res.data.status === 200) {
          console.log(res.data);
          self.setState({
            ...self.state,
            dataChart: res.data.value
          });
        } else {
          console.log(res.data.message);
        }

      })
        .catch(function (error) {
          console.log(error);
        });

      await axios.get(_url + '/track/get-all-track', {
        params: {
          token: token
        }
      }).then(function (res) {
        if (res.data.status === 200) {
          console.log(res.data);
          self.setState({
            ...self.state,
            dataTrack: res.data.value.data
          });
        } else {
          console.log(res.data.message);
        }

      })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  handleClickTrack(id) {
    this.props.history.push(`/track/${id}`)
  }

  onChangeTime = () => {
    console.log(this.time.value);
    if (this.time.value === 'customtime') {
      this.setState({
        ...this.state,
        enable: false
      });
    } else {
      this.setState({
        ...this.state,
        enable: true
      });
    }

  }

  getNewHitTrack = () => {
    var self = this;
    axios.get(_url + '/track/get-coming-hit-track', {
      params: {
        key: ''
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          dataNewTrack: res.data.value
        });
      } else {
        console.log(res.data.message);
      }

    })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTracks = (genre, date) => {
    console.log(genre, date);
    var self = this;
    axios.get(_url + '/chart/get-track', {
      params: {
        genre: genre,
        date: date
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          genreCurrent: genre,
          dateCurrent: date,
          dataTracks: res.data.value
        });
      } else {
        console.log(res.data.message);
      }

    })
      .catch(function (error) {
        console.log(error);
      });


  }

  handleCrawl = (event) => {
    event.preventDefault();
    var self = this;
    var genre = parseInt(this.genre.value), time = this.time.value, startDate = '', endDate = '';
    if (time == 'thisweek') {
      var now = new Date();
      var start = new Date();
      var pastDate = start.getDate() - 7;
      start.setDate(pastDate);
      startDate = dateFormat(start, 'yyyy-mm-dd');
      endDate = dateFormat(now, 'yyyy-mm-dd');
    }
    else if (time == 'previous') {
      var end = new Date();
      var start = new Date();
      var pastDateStart = start.getDate() - 14;
      var pastDateEnd = end.getDate() - 7;
      start.setDate(pastDateStart);
      end.setDate(pastDateEnd)
      startDate = dateFormat(start, 'yyyy-mm-dd');
      endDate = dateFormat(end, 'yyyy-mm-dd');
    } else {
      startDate = this.startDate.value;
      endDate = this.endDate.value;
    }
    console.log(startDate, endDate);


    axios.get(_url + '/crawl', {
      params: {
        startDate: startDate,
        endDate: endDate,
        genreType: genre
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          dataChart: res.data.value
        });
      } else {
        var options_noti = {
          place: 'br',
          message: res.data.value,
          type: 'danger',
          autoDismiss: 3,
        }
        self.refs.notificationAlert.notificationAlert(options_noti);
        console.log(res.data);
      }

    })
      .catch(function (error) {
        console.log(error);
      });

  }

  handleSearch = (event) => {
    event.preventDefault();
    var self = this;
    var genre = this.genre2.value;
    var startDate = this.startDate2.value;
    var endDate = this.endDate2.value;
    var params = {};
    if (genre !== '-1') {
      params.genreType = parseInt(genre);
    }
    if (startDate !== '') {
      params.startDate = startDate;
    }
    if (endDate !== '') {
      params.endDate = endDate;
    }

    if (Object.keys(params).length !== 0) {

      axios.get(_url + '/chart/search', {
        params: params
      }).then(function (res) {
        if (res.data.status === 200) {
          console.log(res.data);
          self.setState({
            ...self.state,
            dataChart: res.data.value
          });
        } else {
          var options_noti = {
            place: 'br',
            message: res.data.value,
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

  }

  getTrackDetail = (id) => {

    var self = this;
    axios.get(_url + '/track/get-track', {
      params: {
        id: id,
        token: localStorage.getItem("token"),
        isAdmin: true
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          trackDetail: res.data.value
        });
      } else {
        console.log(res.data.message);
      }

    })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSearhTrack = () => {
    var self = this;
    var keyword = this.trackSearch.value;
    axios.get(_url + '/track/search', {
      params: {
        keyword: keyword,
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          dataTrack: res.data.value
        });
      } else {
        console.log(res.data.message);
      }

    })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSearhTrack();
    }
  }

  render() {
    const { dataTrack, dataNewTrack, dataChart, dataTracks, genreCurrent, dateCurrent, trackDetail } = this.state;
    return (
      <div className="animated fadeIn">
      <NotificationAlert ref="notificationAlert" />
        <Row style={{ marginTop: '20px' }} >
          <Col xs="12" sm="12" >
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Tracks
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  New Tracks
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Chart
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane style={{ minHeight: "calc(100vh - 190px)" }} tabId="1">
                <Row>
                  <Col col="6" sm="6" md="6" >
                    <Card style={{ margin: '20px 0 20px 20px' }}>
                      <Form onSubmit={this.handleSearch}>
                        <Row style={{ margin: '20px 0 10px 10px' }}>
                          <Col md="6">
                            <InputGroup>
                              <Input onKeyPress={this.handleKeyPress} innerRef={(node) => this.trackSearch = node} id="trackSearch" name="trackSearch" placeholder="Track" />
                              <InputGroupAddon addonType="append">
                                <Button onClick={this.handleSearhTrack} type="button" color="primary">Search</Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Form>
                      <Table hover style={{ margin: '20px', width: '90%' }} responsive>
                        <thead>
                          <tr style={{ backgroundColor: '#c8ced3' }}>
                            <th style={{ width: '10%' }}>#</th>
                            <th>Title</th>
                            <th>Artist</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataTrack.map((e, i) => {
                            return <tr key={i} onClick={() => { this.getTrackDetail(e.id) }}>
                              <td>{i + 1}</td>
                              <td>{e.title}</td>
                              <td>{e.artist}</td>
                            </tr>
                          })}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                  {Object.keys(trackDetail).length !== 0 ? <Col col="6" sm="6" md="6" >
                    <Card style={{ margin: '20px' }}>
                      <Row style={{ margin: '20px' }}>
                        <Col style={{ margin: 'auto'}} col="6" sm="3" md="6">
                          <img style={{maxHeight: '250px', maxWidth: '250px' }} src={trackDetail.trackInfo.track_imageurl}></img>
                        </Col>
                        <Col style={{ margin: 'auto' }} col="6" sm="3" md="6">
                        <div className='track-detail' >
                          <b>Id:</b> {trackDetail.trackInfo.id}
                          </div>
                        </Col>
                      </Row>

                      <Row style={{ margin: '20px' }}>
                        <Col col="6" sm="3" md="6" >
                          <div className='track-detail'>
                            <b>Title:</b> {trackDetail.trackInfo.title}
                          </div>
                        </Col>
                        <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Artist:</b> {trackDetail.trackInfo.artist}
                          </div>
                        </Col>
                      </Row>

                      <Row style={{ margin: '20px' }}>
                        <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Like number:</b> {trackDetail.trackInfo.like}
                          </div>
                        </Col>
                        <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Listen number:</b>  {trackDetail.trackInfo.listen}
                          </div>
                        </Col>
                      </Row>

                      <Row style={{ margin: '20px' }}>
                        <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Track preview url:</b> <a target="_blank" href={trackDetail.trackInfo.track_preview_url}>{trackDetail.trackInfo.track_preview_url != 'null' ? 'Track preview' : ''}</a>
                            </div> 
                        </Col>
                          <Col col="6" sm="3" md="6">
                            <div className='track-detail' >
                              <b>Artist image url:</b> <a target="_blank" href={trackDetail.trackInfo.artist_imageurl}>Artist image</a>
                            </div>
                          </Col>
                      </Row>

                        <Row style={{ margin: '20px' }}>
                          <Col col="6" sm="3" md="6">
                            <div className='track-detail' >
                              <b>Duration ms:</b> {trackDetail.trackFeatures.duration_ms}
                            </div>
                          </Col>
                          <Col col="6" sm="3" md="6">
                            <div className='track-detail' >
                              <b>Tempo:</b> {trackDetail.trackFeatures.tempo}
                            </div>
                          </Col>
                        </Row>

                        <Row style={{ margin: '20px' }}>
                          <Col col="6" sm="3" md="6">
                            <div className='track-detail' >
                              <b>Key:</b> {trackDetail.trackFeatures.key}
                            </div>
                          </Col>
                          <Col col="6" sm="3" md="6">
                            <div className='track-detail' >
                              <b> Mode:</b> {trackDetail.trackFeatures.mode}
                            </div>
                          </Col>
                        </Row>

                        <Row style={{ margin: '20px' }}>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Loudless:</b> {trackDetail.trackFeatures.loudness}
                          </div>
                          </Col>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b> Time signature:</b> {trackDetail.trackFeatures.time_signature}
                          </div>
                          </Col>
                        </Row>

                        <Row style={{ margin: '20px' }}>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b> Danceability:</b> {trackDetail.trackFeatures.danceability}
                          </div>
                          </Col>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b> Accousticness:</b> {trackDetail.trackFeatures.acousticness}
                          </div>
                          </Col>
                        </Row>

                        <Row style={{ margin: '20px' }}>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Speechiness:</b> {trackDetail.trackFeatures.speechiness}
                          </div>
                          </Col>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Instrumentalness:</b> {trackDetail.trackFeatures.instrumentalness}
                          </div>
                          </Col>
                        </Row>

                        <Row style={{ margin: '20px' }}>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Valence:</b> {trackDetail.trackFeatures.valence}
                          </div>
                          </Col>
                          <Col col="6" sm="3" md="6">
                          <div className='track-detail' >
                            <b>Energy:</b> {trackDetail.trackFeatures.energy}
                          </div>
                          </Col>
                        </Row>

                    </Card>
                  </Col> : ''}
                    
                </Row>



















              </TabPane>
              <TabPane style={{ minHeight: "calc(100vh - 190px)" }} tabId="2">
                    <Row style={{ margin: '20px 0 10px 10px' }}>
                      <Col col="6" sm="4" md="2" className="mb-3 mb-xl-0">
                        <Button onClick={this.getNewHitTrack} block color="success">Get new hit tracks</Button>
                      </Col>
                    </Row>
                    <Table style={{ margin: '30px 20px 20px 20px', width: '95%' }} responsive>
                      <thead>
                        <tr style={{ backgroundColor: '#c8ced3' }}>
                          <th style={{ width: '5%' }}>#</th>
                          <th>Title</th>
                          <th>Artist</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataNewTrack.map((e, i) => {
                          return <tr key={e.id}>
                            <td>{i + 1}</td>
                            <td>{e.title}</td>
                            <td>{e.artist}</td>
                          </tr>;
                        })}

                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane style={{ minHeight: "calc(100vh - 190px)" }} tabId="3">
                    <Form onSubmit={this.handleCrawl}>
                      <Row style={{ margin: '20px 0 10px 10px' }}>
                        <Col col="3" sm="3" md="2" className="mb-3 mb-xl-0">
                          <Input innerRef={(node) => this.genre = node} type="select" name="genre" id="genre">
                            <option value="4">All</option>
                            <option value="1">Dance</option>
                            <option value="2">Rock</option>
                            <option value="3">R&B</option>
                          </Input>
                        </Col>
                        <Col col="3" sm="3" md="2" className="mb-3 mb-xl-0">
                          <Input onChange={this.onChangeTime} innerRef={(node) => this.time = node} type="select" name="time" id="time">
                            <option value="thisweek">This week</option>
                            <option value="previous">Previous week</option>
                            <option value="customtime">Custom time</option>
                          </Input>
                        </Col>
                        <Col col="2" sm="4" md="2" className="mb-3 mb-xl-0">
                          <Input required disabled={this.state.enable} innerRef={(node) => this.startDate = node} type="date" id="date-start" name="date-start" placeholder="Start date" />
                        </Col>
                        <Col col="2" sm="4" md="2" className="mb-3 mb-xl-0">
                          <Input required disabled={this.state.enable} innerRef={(node) => this.endDate = node} type="date" id="date-end" name="date-end" placeholder="End date" />
                        </Col>
                        <Col col="2" sm="3" md="1" className="mb-3 mb-xl-0">
                          <Button block color="success">Crawl data</Button>
                        </Col>
                      </Row>
                    </Form>
                    <Row>
                      <Col col="6" sm="6" md="6" >
                        <Card style={{ margin: '20px 0 20px 20px' }}>
                          <Form onSubmit={this.handleSearch}>
                            <Row style={{ margin: '20px 0 10px 10px' }}>
                              <Col col="4" sm="3" md="2" className="mb-3 mb-xl-0">
                                <Input innerRef={(node) => this.genre2 = node} type="select" name="genre" id="genre">
                                  <option value="-1">Genre</option>
                                  <option value="4">All</option>
                                  <option value="1">Dance</option>
                                  <option value="2">Rock</option>
                                  <option value="3">R&B</option>
                                </Input>
                              </Col>
                              <Col col="3" sm="3" md="3" className="mb-3 mb-xl-0">
                                <Input innerRef={(node) => this.startDate2 = node} type="date" id="date-start" name="date-start" placeholder="Start date" />
                              </Col>
                              <Col col="3" sm="3" md="3" className="mb-3 mb-xl-0">
                                <Input innerRef={(node) => this.endDate2 = node} type="date" id="date-end" name="date-end" placeholder="End date" />
                              </Col>
                              <Col col="2" sm="3" md="2" className="mb-3 mb-xl-0">
                                <Button block color="success">Search</Button>
                              </Col>
                            </Row>
                          </Form>


                          <Table hover style={{ margin: '20px', width: '90%' }} responsive>
                            <thead>
                              <tr style={{ backgroundColor: '#c8ced3' }}>
                                <th style={{ width: '10%' }}>#</th>
                                <th>Genre</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataChart.map((e, i) => {
                                return <tr key={i} onClick={() => { this.getTracks(e.genre, e.date) }}>
                                  <td>{i + 1}</td>
                                  <td>{e.genre}</td>
                                  <td>{e.date}</td>
                                </tr>
                              })}
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                      <Col col="6" sm="6" md="6" >
                        <Card style={{ margin: '20px' }}>
                          <Row style={{ margin: '40px 20px 0 20px' }}>
                            <Col col="5" sm="3" md="4" className="mb-3 mb-xl-0">
                              Genre: {genreCurrent}
                            </Col>
                            <Col col="5" sm="3" md="5" className="mb-3 mb-xl-0">
                              Date: {dateCurrent}
                            </Col>
                          </Row>
                          <Table style={{ margin: '20px', width: '95%' }} responsive>
                            <thead>
                              <tr style={{ backgroundColor: '#c8ced3' }}>
                                <th style={{ width: '10%' }}>Position</th>
                                <th>Title</th>
                                <th>Artist</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataTracks.map((e, i) => {
                                return <tr key={i}>
                                  <td>{e.position}</td>
                                  <td>{e.title}</td>
                                  <td>{e.artist}</td>
                                </tr>
                              })}
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                    </Row>

                  </TabPane>
            </TabContent>
          </Col>
        </Row>

      </div>
          );
        }
      }
      
      export default Management;
