import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import musicimg from '../../assets/img/brand/music.jpg';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

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








const pie = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

class Dashboard extends Component {
  render() {



    return (
      <div className="animated fadeIn">
        <Row style={{ margin: '20px 0', display: 'flex' }}>
          <Col xs="12" sm="12" style={{ display: 'flex' }}>
            <img style={{ width: '100%' }} src={musicimg} alt="Music" />
          </Col>
        </Row>

        <Row>
          <Col xs="8" sm="8" style={{ margin: '20px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody style={{ height: '100%' }}>
                <Row style={{ height: '100%' }}>
                  <Col xs="3" sm="3" style={{ display: 'flex', height:'100%' }}>
                    <img className="img-avatar" style={{ height:'100%', width:'100%' }} src='/assets/img/song/beatifulinwhite.jpg' alt="Music" />
                  </Col>
                  <Col xs="9" sm="9" style={{ margin: '10px auto', display: 'flex' }}>
                    <audio controls>
                      <source src="assets/audio/Beautiful-In-White-Westlife.mp3" type="audio/ogg" />
                    </audio>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col xs="4" sm="4" style={{ margin: '20px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody>
                <div className="chart-wrapper">
                  <Pie data={pie} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardHeader>
                Lyrics
              </CardHeader>
              <CardBody>
                <pre style={{ whiteSpace: 'pre-line', maxHeight: '-webkit-fill-available' }}>
                  Actually if you know this {"\n"}but when we first met {"\n"}I got so nervous {"\n"}I couldn’t speak {"\n"}In that very moment {"\n"}I found the one and {"\n"}my life had found its missing piece {"\n"}{"\n"}So as long as I live I’ll love you, {"\n"}will have and hold you {"\n"}You look so beautiful in white {"\n"}And from now til my very last breath {"\n"}This day I’ll cherish {"\n"}You look so beautiful in white tonight {"\n"}{"\n"}What we have is timeless {"\n"}My love is endless {"\n"}and with this ring I say to the world {"\n"}You’re my every reason {"\n"}You’re all that I believe in {"\n"}With all my heart I mean every word {"\n"}{"\n"}So as long as I live I’ll love you, {"\n"}will have and hold you {"\n"}You look so beautiful in white {"\n"}And from now til my very last breath {"\n"}This day I’ll cherish {"\n"}You look so beautiful in white tonight {"\n"}{"\n"}ohh ohh {"\n"}You look so beautiful in white tonight {"\n"}na na na na {"\n"}so beautiful in white tonight {"\n"}{"\n"}And if a daughter is what our future holds {"\n"}I hope she has your eyes {"\n"}finds love like you and I did {"\n"}and when she falls in love we’ll let her go {"\n"}and I’ll walk her down the aisle {"\n"}She’ll look so beautiful in white {"\n"}{"\n"}You look so beautiful in white {"\n"}{"\n"}So as long as I live I’ll love you, {"\n"}will have and hold you {"\n"}You look so beautiful in white {"\n"}And from now til my very last breath {"\n"}This day I’ll cherish {"\n"}You look so beautiful in white tonight {"\n"}You look so beautiful in white tonight {"\n"}
                </pre>

              </CardBody>
            </Card>
          </Col>

          <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody style={{ height: '100%' }}>
                <Widget03 dataBox={() => ({ variant: 'facebook', friends: '89k', feeds: '459' })} >
                  <div className="chart-wrapper">
                    <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
                  </div>
                </Widget03>

                <div className="brand-card">
                  <div className="brand-card-header bg-twitter">
                    <i className="fa fa-twitter"></i>
                    <div className="chart-wrapper">
                      <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
                    </div>
                  </div>
                  <div className="brand-card-body">
                    <div>
                      <div className="text-value">973k</div>
                      <div className="text-uppercase text-muted small">followers</div>
                    </div>
                    <div>
                      <div className="text-value">1.792</div>
                      <div className="text-uppercase text-muted small">tweets</div>
                    </div>
                  </div>
                </div>


              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardHeader>
                Lyrics
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between"><span>Cras justo odio</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left" pill></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>Cras justo odio</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left" pill></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>Cras justo odio</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left" pill></i></ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>

          <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody style={{ height: '100%' }}>
                <Row>
                  <Col style={{ width: '50%' }}>
                    <div>
                      <div className="text-center">Label</div>
                      <Progress> 0%</Progress>
                      <div className="text-center">Label</div>
                      <Progress value="25">25% </Progress>
                      <div className="text-center">Label</div>
                      <Progress value={50}>50% </Progress>
                      <div className="text-center">Label</div>
                      <Progress value={75}>75% </Progress>
                      <div className="text-center">Label</div>
                      <Progress value="100">100% </Progress>
                    </div>
                  </Col>

                  <Col style={{ width: '50%' }}>
                    <div>
                      <div className="text-center">Label</div>
                      <Progress> 0%</Progress>
                      <div className="text-center">Label</div>
                      <Progress value="25">25% </Progress>
                      <div className="text-center">Label</div>
                      <Progress value={50}>50% </Progress>
                      <div className="text-center">Label</div>
                      <Progress value={75}>75% </Progress>
                      <div className="text-center">Label</div>
                      <Progress value="100">100% </Progress>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
