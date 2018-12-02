import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { connect } from 'react-redux';
import axios from 'axios';
const _url = 'http://localhost:10010';
//========================//=====================
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];
const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};


const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}
class Track extends Component {

  state = {
    trackVal: '',
    userFavorite: false,
    likeNumber: 0
  };

  componentDidMount = async () => {
    const urlCurrent = window.location.href.split('/');
    const id = urlCurrent[urlCurrent.length - 1] == '' ? urlCurrent[urlCurrent.length - 2] : urlCurrent[urlCurrent.length - 1];
    var self = this;
    await axios.get(_url + '/track/get-track', {
      params: {
        id: id
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          trackVal: res.data.value,
          likeNumber: res.data.value.trackInfo.like
        })
      } else {
        self.props.history.push('/404')
      }

    })
      .catch(function (error) {
        console.log(error);
      });

    if (this.props.auth.token.length > 0) {
      await axios.get(_url + '/user/check-favorite', {
        params: {
          token: this.props.auth.token,
          trackid: id
        }
      }).then(function (res) {
        if (res.data.status === 200) {
          console.log(res.data);
          if (res.data.value){
            self.setState({
              ...self.state,
              userFavorite: true
            })
          }

        } else {
          self.props.history.push('/404')
        }
  
      })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  handleClickTrack(id) {
    this.props.history.push(`/track/${id}`);
    window.location.reload();

  }

  handleLike = async () =>{
    var self = this;
    const urlCurrent = window.location.href.split('/');
    const id = urlCurrent[urlCurrent.length - 1] == '' ? urlCurrent[urlCurrent.length - 2] : urlCurrent[urlCurrent.length - 1];
    await axios.get(_url + '/user/put-favorite', {
      params: {
        token: this.props.auth.token,
        trackid: id,
        like: !self.state.userFavorite
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        var likeNumber =  self.state.likeNumber
        if(self.state.userFavorite){
          likeNumber -= 1;
        } else {
          likeNumber += 1;
        }
          self.setState({
            ...self.state,
            userFavorite: !self.state.userFavorite,
            likeNumber: likeNumber
          })
      } else {
        self.props.history.push('/404')
      }

    })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    var numberCover = Math.floor(Math.random()*(49)+1);
    var coverImg = `/assets/img/cover/cover_image_${numberCover}.jpg`;
    var  { trackVal, userFavorite, likeNumber } = this.state; 
    var starColor = 'black';
    if(userFavorite){
      starColor='yellow';
    }
    if (trackVal) {
      const pie = {
        labels: [
          'Hit',
          'Non-Hit',
        ],
        datasets: [
          {
            data: [parseFloat(trackVal.hit.hit) * 100, parseFloat(trackVal.hit.nonhit) * 100],
            backgroundColor: [
              '#36A2EB',
              '#FF6384',
            ],
            hoverBackgroundColor: [
              '#36A2EB',
              '#FF6384',
            ],
          }],
      };
      return (
        <div className="animated fadeIn">
          <Row style={{ marginTop: '20px' }} >
            <Col xs="12" sm="12" >
              <div style={{ position: 'relative', display: 'block' }}>
                <img className='img-thumbnail img-avatar' src={trackVal.trackInfo.artist_imageurl}
                  style={{ width: '200px', height: '200px', position: 'absolute', bottom: '10%', left: '3%' }} />
                <img style={{ width: '100%', height: '270px' }} src={coverImg} alt="Music" />
              </div>
              <Card>
                <CardBody style={{ fontSize: '20px', padding: '0,8rem' }}>
                  <i style={{ margin: '0 5px' }} className="fa fa-twitter fa-lg float-right"></i>
                  <i style={{ margin: '0 5px' }} className="fa fa-instagram fa-lg float-right"></i>
                  <i style={{ margin: '0 5px' }} className="fa fa-facebook fa-lg float-right"></i>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="8" sm="8" style={{ margin: '20px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardBody style={{ height: '100%' }}>
                  <Row style={{ height: '100%' }}>
                    <Col xs="3" sm="3" style={{ height: '70%' }}>
                      <img className="img-thumbnail" style={{ height: '100%', width: '100%' }} src={trackVal.trackInfo.track_imageurl} />
                    </Col>
                    <Col xs="7" sm="7" style={{ margin: '10px 20px' }}>
                      <p style={{ fontSize: '50px' }}>{trackVal.trackInfo.title}</p>
                      <p style={{ fontSize: '35px' }}>{trackVal.trackInfo.artist}</p>
                      <br />
                      {this.props.auth.token.length > 0 ? <i style={{ color: starColor }} onClick={this.handleLike} className="icon-star icons font-2xl"></i> : ''}
                      <i style={{ color: '#a1a2af', float: 'right' }}>Lượt xem: {trackVal.trackInfo.listen} | Lượt quan tâm:  {likeNumber} </i>

                    </Col>
                    <audio controls style={{ width: '90%', margin: 'auto' }}>
                      <source src={trackVal.trackInfo.track_preview_url} type="audio/ogg" />
                    </audio>
                    <a style={{ margin: 'auto' }} target="_blank" href={trackVal.trackInfo.track_url} >Listen Full</a>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xs="4" sm="4" style={{ margin: '20px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  It's a hit song or not?
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Pie data={pie} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Recommend songs
                </CardHeader>
                <CardBody>
                  <ListGroup>

                    {trackVal.recommendTracks.map((e) => {
                      return <ListGroupItem key={e.id} onClick={() => {
                        this.handleClickTrack(e.id);
                      }}>
                        <Row>
                          <Col xs="2" sm="2" style={{ display: 'flex' }}>
                            <img src={e.track_imageurl} style={{ width: '100%', height: '100px' }} />
                          </Col>
                          <Col xs="7" sm="7" style={{ margin: 'auto 10px' }}>
                            <Row>
                              <h1 style={{ fontSize: '20px' }}>{e.title}</h1></Row>
                            <Row style={{ marginTop: '5px' }}>
                              <span style={{ fontSize: '15px' }}>{e.artist}</span>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroupItem>

                    })}

                  </ListGroup>
                </CardBody>
              </Card>
            </Col>

            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Music features
                </CardHeader>
                <CardBody style={{ height: '100%' }}>
                  <div className="text-center">Speechiness</div>
                  <Progress value={trackVal.trackFeatures.speechiness * 100}>{trackVal.trackFeatures.speechiness * 100}%</Progress>
                  <br />
                  <div className="text-center">Acousticness</div>
                  <Progress value={trackVal.trackFeatures.acousticness * 100}>{trackVal.trackFeatures.acousticness * 100}% </Progress>
                  <br />
                  <div className="text-center">Instrumentalness</div>
                  <Progress value={trackVal.trackFeatures.instrumentalness * 100}>{trackVal.trackFeatures.instrumentalness * 100}% </Progress>
                  <br />
                  <div className="text-center">Valence</div>
                  <Progress value={trackVal.trackFeatures.valence * 100}>{trackVal.trackFeatures.valence * 100}% </Progress>
                  <br />
                  <div className="text-center">Liveness</div>
                  <Progress value={trackVal.trackFeatures.liveness * 100}>{trackVal.trackFeatures.liveness * 100}% </Progress>
                  <br />
                  <div className="text-center">Energy</div>
                  <Progress value={trackVal.trackFeatures.energy * 100}>{trackVal.trackFeatures.energy * 100}% </Progress>
                  <br />
                  <div className="text-center">Danceability</div>
                  <Progress value={trackVal.trackFeatures.danceability * 100}>{trackVal.trackFeatures.danceability * 100}% </Progress>
                  <br />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardBody style={{ height: '100%' }}>
                  <div className="brand-card">
                    <div className="brand-card-header bg-twitter">
                      <i className="icon-music-tone-alt icons font-2xl"></i>
                      <div className="chart-wrapper">
                        <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
                      </div>
                    </div>
                    <div className="brand-card-body">
                      <div>
                        <div className="text-value">{trackVal.trackFeatures.time_signature} </div>
                        <div className="text-uppercase text-muted small">Time signature</div>
                      </div>
                      <div>
                        <div className="text-value">{trackVal.trackFeatures.key}</div>
                        <div className="text-uppercase text-muted small">Key</div>
                      </div>
                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardBody style={{ height: '100%' }}>
                  <div className="brand-card">
                    <div className="brand-card-header bg-twitter">
                      <i className="icon-equalizer icons font-2xl"></i>
                      <div className="chart-wrapper">
                        <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
                      </div>
                    </div>
                    <div className="brand-card-body">
                      <div>
                        <div className="text-value">{trackVal.trackFeatures.loudness}</div>
                        <div className="text-uppercase text-muted small">Loundness</div>
                      </div>
                      <div>
                        <div className="text-value">{trackVal.trackFeatures.tempo}</div>
                        <div className="text-uppercase text-muted small">Tempo</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardBody style={{ height: '100%' }}>
                  <div className="brand-card">
                    <div className="brand-card-header bg-twitter">
                      <i className="fa fa-area-chart fa-lg icons font-2xl"></i>
                      <div className="chart-wrapper">
                        <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
                      </div>
                    </div>
                    <div className="brand-card-body">
                      <div>
                        <div className="text-value">{trackVal.trackFeatures.mode}</div>
                        <div className="text-uppercase text-muted small">Mode</div>
                      </div>
                      <div>
                        <div className="text-value">{trackVal.trackFeatures.duration_ms}</div>
                        <div className="text-uppercase text-muted small">Duration_ms</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return '';
    }

  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
