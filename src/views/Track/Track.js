import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Tooltip, Col, Row } from 'reactstrap';
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
    likeNumber: 0,
    tooltipOpen: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    tooltips: [
      {
        placement: 'top',
        text: 'Top',
      },
      {
        placement: 'bottom',
        text: 'Bottom',
      },
      {
        placement: 'left',
        text: 'Left',
      },
      {
        placement: 'right',
        text: 'Right',
      },
    ]
  };

  componentDidMount = async () => {
    const urlCurrent = window.location.href.split('/');
    const id = urlCurrent[urlCurrent.length - 1] == '' ? urlCurrent[urlCurrent.length - 2] : urlCurrent[urlCurrent.length - 1];
    var self = this;

    var paramsGetTrack = this.props.auth.token.length > 0 ? 
    { id: id, token: this.props.auth.token } : { id: id }

    await axios.get(_url + '/track/get-track', {
      params: paramsGetTrack
    }).then(function (res) {
      if (res.data.status === 200) {
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
          if (res.data.value) {
            self.setState({
              ...self.state,
              userFavorite: true
            })
          }

        } else {
          self.props.history.push('/500')
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

  handleLike = async () => {
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
        var likeNumber = parseInt(self.state.likeNumber);
        if (self.state.userFavorite) {
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


  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });

    this.setState({
      tooltipOpen: newArray,
    });
  }
  render() {
    var numberCover = Math.floor(Math.random() * (49) + 1);
    var coverImg = `/assets/img/cover/cover_image_${numberCover}.jpg`;
    var { trackVal, userFavorite, likeNumber } = this.state;
    var starColor = '#ddd';
    if (userFavorite) {
      starColor = 'yellow';
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
                      {this.props.auth.token.length > 0 ?
                        <i style={{ color: starColor, fontSize: '40px' }} onClick={this.handleLike} className="fa fa-star"></i> : ''}
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
                  <ListGroup style={{ marginTop: '30px' }}>
                    <ListGroupItem style={{ padding: '20px' }}>
                      <div id="speechiness" className="text-center">Speechiness ({(trackVal.trackFeatures.speechiness * 100).toFixed(2)}%)</div>
                      <Progress value={trackVal.trackFeatures.speechiness * 100}></Progress></ListGroupItem>
                    <ListGroupItem style={{ padding: '20px' }}>
                      <div id="acousticness" className="text-center">Acousticness ({(trackVal.trackFeatures.acousticness * 100).toFixed(2)}%)</div>
                      <Progress value={trackVal.trackFeatures.acousticness * 100}></Progress></ListGroupItem>
                    <ListGroupItem style={{ padding: '20px' }}>
                      <div id="instrumentalness" className="text-center">Instrumentalness ({(trackVal.trackFeatures.instrumentalness * 100).toFixed(2)} %)</div>
                      <Progress value={trackVal.trackFeatures.instrumentalness * 100}></Progress></ListGroupItem>
                    <ListGroupItem style={{ padding: '20px' }}>
                      <div id="valence" className="text-center">Valence ({(trackVal.trackFeatures.valence * 100).toFixed(2)}%)</div>
                      <Progress value={trackVal.trackFeatures.valence * 100}></Progress></ListGroupItem>
                    <ListGroupItem style={{ padding: '20px' }}>
                      <div id="liveness" className="text-center">Liveness ({(trackVal.trackFeatures.liveness * 100).toFixed(2)} %)</div>
                      <Progress value={trackVal.trackFeatures.liveness * 100}></Progress></ListGroupItem>
                    <ListGroupItem style={{ padding: '20px' }}>
                      <div id="energy" className="text-center">Energy ({(trackVal.trackFeatures.energy * 100).toFixed(2)} %)</div>
                      <Progress value={trackVal.trackFeatures.energy * 100}></Progress></ListGroupItem>
                    <ListGroupItem style={{ padding: '20px' }} >
                      <div id="danceability" className="text-center">Danceability ({(trackVal.trackFeatures.danceability * 100).toFixed(2)} %)</div>
                      <Progress value={trackVal.trackFeatures.danceability * 100}></Progress></ListGroupItem>
                  </ListGroup>
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
                      <div id="time-signature">
                        <div className="text-value">{trackVal.trackFeatures.time_signature} </div>
                        <div className="text-uppercase text-muted small">Time signature</div>
                      </div>
                      <div id="key">
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
                      <div id="loudness">
                        <div className="text-value">{trackVal.trackFeatures.loudness}</div>
                        <div className="text-uppercase text-muted small">Loudness</div>
                      </div>
                      <div id="tempo">
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
                      <div id="mode">
                        <div className="text-value">{trackVal.trackFeatures.mode}</div>
                        <div className="text-uppercase text-muted small">Mode</div>
                      </div>
                      <div id="duration">
                        <div className="text-value">{trackVal.trackFeatures.duration_ms}</div>
                        <div className="text-uppercase text-muted small">Duration_ms</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[0]} autohide={false} target="mode" toggle={() => { this.toggle(0); }}>
            Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[1]} autohide={false} target="time-signature" toggle={() => { this.toggle(1); }}>
            An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).
            </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[2]} autohide={false} target="acousticness" toggle={() => { this.toggle(2); }}>
            A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[3]} autohide={false} target="danceability" toggle={() => { this.toggle(3); }}>
            Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[4]} autohide={false} target="energy" toggle={() => { this.toggle(4); }}>
            Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[5]} autohide={false} target="key" toggle={() => { this.toggle(5); }}>
            The estimated overall key of the track follow Pitch Class notation (https://en.wikipedia.org/wiki/Pitch_class)
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[6]} autohide={false} target="tempo" toggle={() => { this.toggle(6); }}>
            The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[7]} autohide={false} target="speechiness" toggle={() => { this.toggle(7); }}>
            Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[8]} autohide={false} target="instrumentalness" toggle={() => { this.toggle(8); }}>
            Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[9]} autohide={false} target="duration" toggle={() => { this.toggle(9); }}>
            The duration of the track in milliseconds
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[10]} autohide={false} target="valence" toggle={() => { this.toggle(10); }}>
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[11]} autohide={false} target="loudness" toggle={() => { this.toggle(11); }}>
            The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
          </Tooltip>
          <Tooltip style={{ maxWidth: '400px' }} placement="top" isOpen={this.state.tooltipOpen[12]} autohide={false} target="liveness" toggle={() => { this.toggle(12); }}>
            Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
          </Tooltip>

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
