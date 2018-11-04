import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import musicimg from '../../assets/img/brand/music.jpg'
import artistimg from '../../assets/img/brand/avatar.jpg'
import Widget03 from '../Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

//========================//=====================

class SearchLayout extends Component {
  render() {
    return (
      <div className="animated fadeIn" style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>
        <ListGroupItem>
          <Row>
            <Col xs="2" sm="2" style={{ display: 'flex' }}>
              <img src={musicimg} style={{ width: '100%', height: '100px' }} />
            </Col>
            <Col xs="7" sm="7">
              <Row>
                <h1 style={{ fontSize: '20px' }}>Love me like you do</h1></Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '15px' }}>Selena Gomes</span>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Thể loại: </span>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Dance, Rock</span>
              </Row>
            </Col>
            <Col xs="3" sm="3">
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt nghe: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ marginTop: '5px', paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt like: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <i className="icon-playlist icons font-lg float-right"></i>
                  <i className="icon-cloud-download icons font-lg float-right" style={{ marginRight: '10px' }} ></i>
                  <i className="icon-heart icons font-lg float-right" style={{ marginRight: '10px' }}></i>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroupItem>

        <ListGroupItem>
          <Row>
            <Col xs="2" sm="2" style={{ display: 'flex' }}>
              <img src={musicimg} style={{ width: '100%', height: '100px' }} />
            </Col>
            <Col xs="7" sm="7">
              <Row>
                <h1 style={{ fontSize: '20px' }}>Love me like you do</h1></Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '15px' }}>Selena Gomes</span>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Thể loại: </span>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Dance, Rock</span>
              </Row>
            </Col>
            <Col xs="3" sm="3">
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt nghe: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ marginTop: '5px', paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt like: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <i className="icon-playlist icons font-lg float-right"></i>
                  <i className="icon-cloud-download icons font-lg float-right" style={{ marginRight: '10px' }} ></i>
                  <i className="icon-heart icons font-lg float-right" style={{ marginRight: '10px' }}></i>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroupItem>

        <ListGroupItem>
          <Row>
            <Col xs="2" sm="2" style={{ display: 'flex' }}>
              <img src={musicimg} style={{ width: '100%', height: '100px' }} />
            </Col>
            <Col xs="7" sm="7">
              <Row>
                <h1 style={{ fontSize: '20px' }}>Love me like you do</h1></Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '15px' }}>Selena Gomes</span>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Thể loại: </span>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Dance, Rock</span>
              </Row>
            </Col>
            <Col xs="3" sm="3">
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt nghe: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ marginTop: '5px', paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt like: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <i className="icon-playlist icons font-lg float-right"></i>
                  <i className="icon-cloud-download icons font-lg float-right" style={{ marginRight: '10px' }} ></i>
                  <i className="icon-heart icons font-lg float-right" style={{ marginRight: '10px' }}></i>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroupItem>

        <ListGroupItem>
          <Row>
            <Col xs="2" sm="2" style={{ display: 'flex' }}>
              <img src={musicimg} style={{ width: '100%', height: '100px' }} />
            </Col>
            <Col xs="7" sm="7">
              <Row>
                <h1 style={{ fontSize: '20px' }}>Love me like you do</h1></Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '15px' }}>Selena Gomes</span>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Thể loại: </span>
                <span style={{ fontSize: '13px', color: '#8f9ba6' }}>Dance, Rock</span>
              </Row>
            </Col>
            <Col xs="3" sm="3">
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt nghe: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='border border-secondary rounded float-right' style={{ marginTop: '5px', paddingLeft: '7px', paddingRight: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>Lượt like: </span>
                    <span style={{ fontSize: '12px', color: '#8f9ba6' }}>1.253.369</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <i className="icon-playlist icons font-lg float-right"></i>
                  <i className="icon-cloud-download icons font-lg float-right" style={{ marginRight: '10px' }} ></i>
                  <i className="icon-heart icons font-lg float-right" style={{ marginRight: '10px' }}></i>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroupItem>
      </div>
    );
  }
}

export default SearchLayout;
