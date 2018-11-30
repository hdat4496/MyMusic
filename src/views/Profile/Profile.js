import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import musicimg from '../../assets/img/brand/music.jpg'
import artistimg from '../../assets/img/brand/avatar.jpg'
import Widget03 from '../Widgets/Widget03'
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
    'Non-Hit',
    'Hit',
  ],
  datasets: [
    {
      data: [40, 60],
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
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}
class Profile extends Component {
  componentDidMount(){
    var user = localStorage.getItem("username");
    var token = localStorage.getItem("token");
    if (!user && !token) {
      this.props.history.push('/404');
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row style={{ marginTop: '20px' }} >
          <Col xs="12" sm="12" >
            <div style={{ position: 'relative', display: 'block' }}>
              <div style={{position: 'absolute', height:'100%', margin:'30px'}}>
                <img className='img-thumbnail img-avatar' src={artistimg}
                 style={{ height: '75%' }} />
                <p style={{ marginLeft: '30px', color: 'white', fontSize: '25px' }}>Huỳnh Duy Anh Toàn</p>
              </div>

              <img style={{ width: '100%', height: '370px' }} src={musicimg} alt="Music" />
            </div>
            {/* <Card>
              <CardBody style={{ fontSize: '20px', padding: '0,8rem' }}>
                  <span style ={{marginLeft:'30px'}}>Huỳnh Duy Anh Toàn</span>
              </CardBody>
            </Card> */}
          </Col>
        </Row>

.
        <Row>
          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardHeader>
                Recommend songs
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between"><span>Love me like you do</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left"></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>Look what you made me do</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left"></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>Girls like you</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left"></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>One more night</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left"></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>..Ready for it?</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left"></i></ListGroupItem>
                  <ListGroupItem className="justify-content-between"><span>Way back home</span><i style={{ margin: '5px 20px 0px 0px' }} className="fa fa-play-circle-o fa-lg float-left"></i></ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
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
                      <div className="text-value">4 beat</div>
                      <div className="text-uppercase text-muted small">Time signature</div>
                    </div>
                    <div>
                      <div className="text-value">C#</div>
                      <div className="text-uppercase text-muted small">Key</div>
                    </div>
                  </div>
                </div>

                <div className="brand-card">
                  <div className="brand-card-header bg-twitter">
                    <i className="icon-equalizer icons font-2xl"></i>
                    <div className="chart-wrapper">
                      <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
                    </div>
                  </div>
                  <div className="brand-card-body">
                    <div>
                      <div className="text-value">1.023</div>
                      <div className="text-uppercase text-muted small">Loundness</div>
                    </div>
                    <div>
                      <div className="text-value">113</div>
                      <div className="text-uppercase text-muted small">Tempo</div>
                    </div>
                  </div>
                </div>


              </CardBody>
            </Card>
          </Col>


        </Row>
      </div>
    );
  }
}

export default Profile;
