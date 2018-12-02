import React, { Component } from 'react';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import artistimg from '../../assets/img/brand/avatar.jpg';
import axios from 'axios';
const _url = 'http://localhost:10010';
//========================//=====================
class Profile extends Component {
  state = {
    favoriteTrack: []
  }
  componentDidMount(){
    var user = localStorage.getItem("username");
    var token = localStorage.getItem("token");
    var self = this;
    if (!user || !token) {
      this.props.history.push('/404');
    } else {
      
      axios.get(_url + '/user/favorite', {
        params: {
          token: token,
        }
      }).then(function (res) {
        if (res.data.status === 200) {
          
          console.log(res.data);
          self.setState({
            ...self.state,
            favoriteTrack: res.data.resultList
          });
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
    this.props.history.push(`/track/${id}`)
  }
  render() {
    var numberCover = Math.floor(Math.random()*(49)+1);
    var coverImg = `/assets/img/cover/cover_image_${numberCover}.jpg`;
    const {favoriteTrack} = this.state;
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
              <img style={{ width: '100%', height: '370px' }} src={coverImg} alt="Music" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" style={{ margin: '10px auto', display: 'flex' }}>
            <Card style={{ width: '100%' }}>
            <CardHeader>
              Favorite track
            </CardHeader>
            <CardBody>
            {favoriteTrack.map((e) => {
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
    );
  }
}

export default Profile;
