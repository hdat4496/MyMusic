import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import musicimg from '../../assets/img/brand/music.jpg';

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
            <img src={musicimg} alt="Music" />
          </Col>
        </Row>

        <Row>
          <Col xs="8" sm="8" style={{ margin: '20px auto', display: 'flex' }}>.
          <Card style={{ width: '100%' }}>
              <CardBody>
                <audio controls>
                  <source src="horse.ogg" type="audio/ogg" />
                </audio>
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
          <Col xs="8" sm="8" style={{ margin: '10px auto', display: 'flex' }}>.
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

          <Col xs="4" sm="4" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
              <CardBody style={{ height: '100%' }}>
                <Row style={{ height: '50%' }}>
                  dfadsfdsaf
                </Row>
                <Row style={{ height: '50%' }}>
                  dfadsfdsafdsgfd
                </Row>
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

export default Dashboard;
