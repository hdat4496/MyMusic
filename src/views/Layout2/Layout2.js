import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import musicimg from '../../assets/img/brand/music.jpg';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
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

class Layout2 extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>.
          <Card style={{ width: '100%' }}>
              <CardHeader>
                Lyrics
              </CardHeader>
              <CardBody>
                onsectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                onsectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                onsectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                onsectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                onsectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>

          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>
          <Card style={{ width: '100%' }}>
            <CardHeader>
              Line Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>.
          <Card style={{ width: '100%' }}>
              <CardHeader>
                Lyrics
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">Cras justo odio <Badge className="float-right" pill>14</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge className="float-right" pill>2</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Morbi leo risus <Badge className="float-right" pill
                    color="warning">1</Badge></ListGroupItem>
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
                    <div className="text-center">0%</div>
                    <Progress />
                    <div className="text-center">25%</div>
                    <Progress value="25" />
                    <div className="text-center">50%</div>
                    <Progress value={50} />
                    <div className="text-center">75%</div>
                    <Progress value={75} />
                    <div className="text-center">100%</div>
                    <Progress value="100" />
                  </div>
                </Col>

                <Col style={{ width: '50%' }}>
                  <div>
                    <div className="text-center">0%</div>
                    <Progress />
                    <div className="text-center">25%</div>
                    <Progress value="25" />
                    <div className="text-center">50%</div>
                    <Progress value={50} />
                    <div className="text-center">75%</div>
                    <Progress value={75} />
                    <div className="text-center">100%</div>
                    <Progress value="100" />
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

export default Layout2;
