import React, { Component } from 'react';
import {  ListGroupItem, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
//========================//=====================
const _url = 'http://localhost:10010';
class SearchLayout extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'track',
      byTrack: [],
      byArtist: [],
    };
  }
  componentDidMount = async () => {
    const self = this;
    const urlCurrent = window.location.href.split('=');
    var keyword = urlCurrent[urlCurrent.length - 1];
    keyword = keyword.split('%20').join(' ').trim();
    var byTrack = [], byArtist = [];
    console.log(keyword);

    if (keyword.includes("#")){
      var lastIndex = keyword.lastIndexOf("#");
      keyword = keyword.substring(0, lastIndex);
      }
    await axios.get(_url + '/track/search', {
      params: {
        keyword: keyword,
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        byTrack = res.data.value;
      } else {
        self.props.history.push('/500')
      }
    })
      .catch(function (error) {
        console.log(error);
      });

    await axios.get(_url + '/artist/search', {
      params: {
        keyword: keyword,
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        byArtist = res.data.value;
      } else {
        self.props.history.push('/500')
      }
    })
      .catch(function (error) {
        console.log(error);
      });

    await this.setState({
      ...this.state,
      byArtist: byArtist,
      byTrack: byTrack
    });


  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        ...this.state,
        activeTab: tab,
      });
    }
  }

  handleCallApi = async () => {
    const self = this;
    const urlCurrent = window.location.href.split('=');
    var keyword = urlCurrent[urlCurrent.length - 1];
    keyword = keyword.split('%20').join(' ').trim();
    if (keyword.includes("#")){
    var lastIndex = keyword.lastIndexOf("#");
    keyword = keyword.substring(0, lastIndex);
    }
    console.log(keyword);
    var byTrack = [], byArtist = [];
    await axios.get(_url + '/track/search-api-title', {
      params: {
        title: keyword,
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res);
        byTrack = res.data.value;
      } else {
        console.log(res);
        self.props.history.push('/500');
      }
    })
      .catch(function (error) {
        console.log(error);
      });

    await axios.get(_url + '/artist/search-api', {
      params: {
        name: keyword,
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        byArtist = res.data.value;
      } else {
        self.props.history.push('/500');
      }
    })
      .catch(function (error) {
        console.log(error);
      });

    await this.setState({
      ...this.state,
      byArtist: byArtist,
      byTrack: byTrack
    });

  }


  handleClickTrack(id) {
    this.props.history.push(`/track/${id}`)
  }

  handleClickArtist(id) {
    this.props.history.push(`/artist/${id}`)
  }
  render() {
    const { byTrack, byArtist } = this.state;
    return (
      <div className="animated fadeIn" style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>
        <Alert color="primary">
        If there are no results you want to search, please click <a onClick={this.handleCallApi} href="#" className="alert-link">search more</a>.
                </Alert>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'track' })}
              onClick={() => { this.toggle('track'); }}
            >
              Track
                </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'artist' })}
              onClick={() => { this.toggle('artist'); }}
            >
              Artist
                </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="track">
            {byTrack.map((e) => {
              return <ListGroupItem key={e.id} onClick={() => {
                this.handleClickTrack(e.id);
              }}>
                <Row>
                  <Col xs="2" sm="2" style={{ display: 'flex' }}>
                    <img src={e.track_imageurl} style={{ width: '100%', height: '100px' }} />
                  </Col>
                  <Col xs="7" sm="7">
                    <Row>
                      <h1 style={{ fontSize: '20px' }}>{e.title}</h1></Row>
                    <Row style={{ marginTop: '5px' }}>
                      <span style={{ fontSize: '15px' }}>{e.artist}</span>
                    </Row>
                  </Col>
                </Row>
              </ListGroupItem>
            })}

          </TabPane>
          <TabPane tabId="artist">
          {byArtist.map((e) => {
              return <ListGroupItem key={e.id} onClick={() => {
                this.handleClickArtist(e.id);
              }}>
                <Row>
                  <Col xs="2" sm="2" style={{ display: 'flex' }}>
                    <img src={e.imageurl} style={{ width: '100%', height: '100px' }} />
                  </Col>
                  <Col xs="7" sm="7" style={{margin: 'auto 0'}}>
                      <Row>
                      <h1 style={{ fontSize: '20px' }}>{e.name}</h1></Row>
                    <Row style={{ marginTop: '5px' }}>
                      <span style={{ fontSize: '15px' }}>{e.genre}</span>
                    </Row>
                  </Col>
                </Row>
              </ListGroupItem>
            })}
              </TabPane>
        </TabContent>


      </div>
    );
  }
}

export default SearchLayout;
