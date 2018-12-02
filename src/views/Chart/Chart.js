import React, { Component } from 'react';
import { Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardHeader,
  Col,
  Progress,
  Row,
  Button,
  Label,
  Input,
  Form
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { connect } from 'react-redux';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';

const _url = 'http://localhost:10010';
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')

const brandDanger = getStyle('--danger')


//==============================//============================
const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
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

class Chart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      chartVal: '',
      dateStart: '',
      dateEnd: '',
      genre: 0

    };
  }

  componentDidMount() {
    var self = this;
    axios.get(_url + '/chart/get-report', {
      params: {
        genreType: 0
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        self.setState({
          ...self.state,
          chartVal: res.data.value
        });
        console.log(res.data.value);
      } else {
        console.log(res.data.message);
      }
    })
      .catch(function (error) {
        console.log(error);
      });

  }


  handleGetChart = (event) => {
    event.preventDefault();
    const self = this;
    const dateStart = this.dateStart.value;
    const dateEnd = this.dateEnd.value;
    const genre = this.genre.value;
    axios.get(_url + '/chart/get-report', {
      params: {
        startDate: dateStart,
        endDate: dateEnd,
        genreType: genre,
        userSelect: true
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        self.setState({
          ...self.state,
          chartVal: res.data.value
        });
        console.log(res.data.value);
      } else {
        const options_noti = {
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



  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {
    const { chartVal } = this.state;
    console.log(chartVal);
    if (chartVal) {
      //Mode chart
      const chart_mode_data = {
        labels: chartVal.mode.label,
        datasets: [
          {
            data: chartVal.mode.data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
            ],
          }],
      };

      //time signature chart
      const chart_time_signature_data = {
        labels: chartVal.time_signature.label,
        datasets: [
          {
            data: chartVal.time_signature.data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCA3A',
              '#8AC926',
              '#1982C4',
              '#937D64',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCA3A',
              '#8AC926',
              '#1982C4',
              '#937D64',
            ],
          }],
      };

      //Rhythm chart
      const mainChart = {
        labels: chartVal.rhythm.label,
        datasets: [
          {
            label: 'Acousticness',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: chartVal.rhythm.data_acousticness,
          },
          {
            label: 'Danceability',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: chartVal.rhythm.data_danceability,
          },
          {
            label: 'Energy',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5],
            data: chartVal.rhythm.data_energy,
          },
        ],
      };

      // Chart Key
      const chart_key_data = {
        labels: chartVal.key.label,
        datasets: [
          {
            data: chartVal.key.data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCA3A',
              '#8AC926',
              '#1982C4',
              '#937D64',
              '#DDFFD9',
              '#ECC8AE',
              '#6C4B5E',
              '#FF331F',
              '#59656F',
              '#7768AE',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCA3A',
              '#8AC926',
              '#1982C4',
              '#937D64',
              '#DDFFD9',
              '#ECC8AE',
              '#6C4B5E',
              '#FF331F',
              '#59656F',
              '#7768AE',
            ],
          }],
      };

      // Chart tempo
      const tempo_chart = {
        labels: chartVal.tempo.label,
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
            data: chartVal.tempo.data,
          },
        ],
      };


      //Chart vocality
      const vocality_chart = {
        labels: chartVal.vocality.label,
        datasets: [
          {
            label: 'Speechiness',
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
            data: chartVal.vocality.data_speechiness,
          },
          {
            label: 'instrumentalness',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(233, 30, 99, 0.7)',
            borderColor: brandDanger,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: brandDanger,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: brandDanger,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartVal.vocality.data_instrumentalness,
          },
        ],
      };

      //Chart Duration
      const duration_chart = {
        labels: chartVal.duration_ms.label,
        datasets: [
          {
            label: 'Duration ms',
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
            data: chartVal.duration_ms.data,
          },
        ],
      };

      //Chart Valence
      const valence_chart = {
        labels: chartVal.valence.label,
        datasets: [
          {
            label: 'Valence',
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
            data: chartVal.valence.data,
          },
        ],
      };

      //Chart Loudness
      const loudness_chart = {
        labels: chartVal.loudness.label,
        datasets: [
          {
            label: 'Loudness',
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
            data: chartVal.loudness.data,
          },
        ],
      };
      return (
        <div className="animated fadeIn">
          <NotificationAlert ref="notificationAlert" />
          <Form onSubmit={this.handleGetChart}>
            <Row>
              <Col xs="12" sm="12" style={{ margin: '10px auto' }}>
                <Card style={{ width: '100%' }}>
                  <CardHeader>
                    Please enter input
                </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="0.5" md="0.5" style={{ margin: 'auto' }}>
                        <Label htmlFor="select">Genre</Label>
                      </Col>
                      <Col xs="2" md="2">
                        <Input required innerRef={(node) => this.genre = node} type="select" name="genre" id="genre">
                          <option value="4">All</option>
                          <option value="1">Dance</option>
                          <option value="2">Rock</option>
                          <option value="3">R&B</option>
                        </Input>
                      </Col>
                      <Col xs="0.5" md="0.5" style={{ margin: 'auto' }}>
                        <Label htmlFor="date-start">Start date</Label>
                      </Col>
                      <Col xs="3" md="3">
                        <Input required innerRef={(node) => this.dateStart = node} type="date" id="date-start" name="date-start" placeholder="date" />
                      </Col>
                      <Col xs="0.5" md="0.5" style={{ margin: 'auto' }}>
                        <Label htmlFor="date-end">End date</Label>
                      </Col>
                      <Col xs="3" md="3">
                        <Input required innerRef={(node) => this.dateEnd = node} type="date" id="date-end" name="date-end" placeholder="date" />
                      </Col>
                      <Col xs="1" md="1" style={{ margin: 'auto' }}>
                        <Button block color="primary" className="btn-pill">Get chart</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>

          <Row>
            <Col xs="4" sm="4" style={{ margin: '10px auto' }}>
              <Row>
                <Col xs="12">
                  <Card style={{ width: '100%' }}>
                    <CardHeader>
                      Mode
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Doughnut data={chart_mode_data} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>

                  <Card style={{ width: '100%', marginTop: '20px' }}>
                    <CardHeader>
                      Time signature
                    </CardHeader>
                    <CardBody >
                      <div className="chart-wrapper" >
                        <Doughnut data={chart_time_signature_data} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

            </Col>

            <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }} >
                <CardBody>
                  <Row>
                    <Col sm="5">
                      <CardTitle className="mb-0">Rhythm</CardTitle>
                      <div className="small text-muted">April 2018</div>
                    </Col>
                  </Row>
                  <div className="chart-wrapper" style={{ marginTop: 40 + 'px' }}>
                    <Line data={mainChart} options={mainChartOpts} />
                  </div>
                </CardBody>
                <CardFooter >
                  <Row className="text-center">
                    <Col sm={12} md className="mb-sm-2 mb-0">
                      <strong>Acousticness</strong>
                      <Progress className="progress-xs mt-2" color="success" value="100" />
                    </Col>
                    <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                      <strong>Danceability</strong>
                      <Progress className="progress-xs mt-2" color="info" value="100" />
                    </Col>
                    <Col sm={12} md className="mb-sm-2 mb-0">
                      <strong>Energy</strong>
                      <Progress className="progress-xs mt-2" color="danger" value="100" />
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Key
                </CardHeader>
                <CardBody style={{ height: '100%' }}>

                  <div className="chart-wrapper">
                    <Pie data={chart_key_data} />
                  </div>

                </CardBody>
              </Card>
            </Col>

            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Tempo
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={tempo_chart} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Vocality
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={vocality_chart} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Duration
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={duration_chart} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Valence
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={valence_chart} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader>
                  Loudness
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={loudness_chart} options={options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );


    } else { return ''; }

  }
}

export default Chart;
