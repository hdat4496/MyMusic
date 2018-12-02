import React, { Component } from 'react';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import artistimg from '../../assets/img/brand/avatar.jpg';
import axios from 'axios';
const _url = 'http://localhost:10010';
//========================//=====================
class Artist extends Component {
  state = {
    artistVal: ''
  }
  componentDidMount(){
    const urlCurrent = window.location.href.split('/');
    const id = urlCurrent[urlCurrent.length - 1] == '' ? urlCurrent[urlCurrent.length - 2] : urlCurrent[urlCurrent.length - 1];
    var self = this;
    axios.get(_url + '/artist/get-artist', {
      params: {
        id: id
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log(res.data);
        self.setState({
          ...self.state,
          artistVal: res.data.value
        })
      } else {
        self.props.history.push('/404')
      }

    })
      .catch(function (error) {
        console.log(error);
      });
  

    }
  
    handleClickTrack(id) {
      this.props.history.push(`/track/${id}`)
    }
  
  render() {
    var numberCover = Math.floor(Math.random()*(49)+1);
    var coverImg = `/assets/img/cover/cover_image_${numberCover}.jpg`;
    const {artistVal} = this.state;
    if(artistVal){return (
      <div className="animated fadeIn">
        <Row style={{ marginTop: '20px' }} >
          <Col xs="12" sm="12" >
            <div style={{ position: 'relative', display: 'block' }}>
              <div style={{position: 'absolute', height:'100%', margin:'30px'}}>
                <img className='img-thumbnail img-avatar' src={artistVal.info.imageurl}
                 style={{ height: '75%' }} />
                <p style={{ marginLeft: '30px', color: 'white', fontSize: '25px' }}>{artistVal.info.name}</p>
              </div>
              <img style={{ width: '100%', height: '370px' }} src={coverImg} alt="Music" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
            <CardHeader>
              Tracks
            </CardHeader>
            <CardBody>
            {artistVal.tracks.map((e) => {
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
            </CardBody>
            </Card>
          </Col>


        </Row>
      </div>
    );} else {return '';}
    
  }
}

export default Artist;
