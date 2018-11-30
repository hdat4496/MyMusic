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
  Input
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { connect } from 'react-redux';
import axios from 'axios';
const _url = 'http://localhost:10010';
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')

const brandDanger = getStyle('--danger')


//==============================//============================
//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'Acousticness',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'Danceability',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'Energy',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

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
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
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

//==============================//============================

const chart_key_data = {
  labels: [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ],
  datasets: [
    {
      data: [40, 40, 10, 0, 30, 20, 20, 30, 120, 60, 10, 40],
      backgroundColor: [
        '#ff4444',
        '#CC0000',
        '#ffbb33',
        '#FF8800',
        '#00C851',
        '#33b5e5',
        '#0099CC',
        '#2BBBAD',
        '#00695c',
        '#aa66cc',
        '#9933CC',
        '#2E2E2E',
      ],
      hoverBackgroundColor: [
        '#ff4444',
        '#CC0000',
        '#ffbb33',
        '#FF8800',
        '#00C851',
        '#33b5e5',
        '#0099CC',
        '#2BBBAD',
        '#00695c',
        '#aa66cc',
        '#9933CC',
        '#2E2E2E',
      ],
    }],
};

const chart_mode_data = {
  labels: [
    'Minor',
    'Major',
  ],
  datasets: [
    {
      data: [35, 65],
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

const chart_time_signature_data = {
  labels: [
    '1 beat',
    '2 beat',
    '3 beat',
    '4 beat'
  ],
  datasets: [
    {
      data: [35, 65, 20, 49],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#00C851',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FF6384',
        '#00C851',
      ],
    }],
};


//==============================//============================

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sample Data',
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

const multi_line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [65, 59, 80, 81, 56, 55, 40],
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
      data: [45, 69, 30, 51, 76, 52, 45],
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

//==============================//============================

class Chart extends Component {


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      chartVal: '',

      modeLable: [],
      modeData: [],

      timeSignatureLable: [],
      timeSignatureData: [],

      keyLable: [],
      keyData: [],

      tempoLable: [],
      tempoData: [],





      durationLable: [],
      durationData: [],

      valenceLable: [],
      valenceData: [],

      loudnessLable: [],
      loudnessData: [],
      
      rhythmLable: [],
      energyData: [],
      danceabilityData: [],
      acousticnessData: []
      

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
    return (
      <div className="animated fadeIn">

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
                    <Input type="select" name="genre" id="genre">
                      <option value="0">Please select</option>
                      <option value="dance">Dance</option>
                      <option value="rock">Rock</option>
                      <option value="rb">R&B</option>
                    </Input>
                  </Col>
                  <Col xs="0.5" md="0.5" style={{ margin: 'auto' }}>
                    <Label htmlFor="date-start">Start date</Label>
                  </Col>
                  <Col xs="3" md="3">
                    <Input type="date" id="date-start" name="date-start" placeholder="date" />
                  </Col>
                  <Col xs="0.5" md="0.5" style={{ margin: 'auto' }}>
                    <Label htmlFor="date-end">End date</Label>
                  </Col>
                  <Col xs="3" md="3">
                    <Input type="date" id="date-end" name="date-end" placeholder="date" />
                  </Col>
                  <Col xs="1" md="1" style={{ margin: 'auto' }}>
                    <Button block color="primary" className="btn-pill">Get chart</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

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

                <Card style={{ width: '100%' }}>
                  <CardHeader>
                    Time signature
                  </CardHeader>
                  <CardBody>
                    <div className="chart-wrapper" >
                      <Doughnut data={chart_time_signature_data} options={options} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Col>

          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Rhythm</CardTitle>
                    <div className="small text-muted">April 2018</div>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Acousticness</div>
                    <strong>2703 songs (40%)</strong>
                    <Progress className="progress-xs mt-2" color="success" value="40" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Danceability</div>
                    <strong>293 songs (20%)</strong>
                    <Progress className="progress-xs mt-2" color="info" value="20" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Energy</div>
                    <strong>706 songs (60%)</strong>
                    <Progress className="progress-xs mt-2" color="danger" value="60" />
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
                  <Line data={line} options={options} />
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
                  <Line data={multi_line} options={options} />
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
                  <Line data={line} options={options} />
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
                  <Line data={line} options={options} />
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
                  <Line data={line} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Chart;
