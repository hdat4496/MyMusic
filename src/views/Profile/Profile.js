import React, { Component } from 'react';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Badge, Col, Row } from 'reactstrap';
import artistimg from '../../assets/img/brand/default_avatar.png';
import axios from 'axios';
import { connect } from 'react-redux';
const _url = 'http://localhost:10010';
//========================//=====================
class Profile extends Component {
  state = {
    favoriteTrack: []
  }
  componentDidMount() {
    var user = localStorage.getItem("username");
    var token = localStorage.getItem("token");
    var fullname = localStorage.getItem("fullname");
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

  removeFavoriteTrack  = async (id) => {
    var self = this;
    await axios.get(_url + '/user/put-favorite', {
      params: {
        token: this.props.auth.token,
        trackid: id,
        like: false
      }
    }).then(function (res) {
      if (res.data.status === 200) {
        console.log("Remove successful")
      } else {
        self.props.history.push('/404')
      }

    })
      .catch(function (error) {
        console.log(error);
      });
      
      axios.get(_url + '/user/favorite', {
        params: {
          token: this.props.auth.token,
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

  render() {
    var numberCover = Math.floor(Math.random() * (49) + 1);
    var coverImg = `/assets/img/cover/cover_image_${numberCover}.jpg`;
    const { favoriteTrack } = this.state;
    return (
      <div className="animated fadeIn">
        <Row style={{ marginTop: '20px' }} >
          <Col xs="12" sm="12" >
            <div style={{ position: 'relative', display: 'block' }}>
              <div style={{ position: 'absolute', height: '100%', margin: '30px', textAlign: 'center' }}>
                <img className='img-thumbnail img-avatar' src={artistimg}
                  style={{ height: '75%' }} />
                <p style={{ marginLeft: '30px', color: 'white', fontSize: '25px' }}>{localStorage.getItem("fullname")}</p>
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
                  return <Col key={e.id} xs="12" sm="12">
                    <Row>
                      <Col xs="11" sm="11">
                        <ListGroupItem  onClick={() => {
                          this.handleClickTrack(e.id);
                        }}>
                          <Row>
                            <Col xs="2" sm="2" style={{ display: 'flex' }}>
                              <img src={e.track_imageurl} style={{ width: '100%', height: '100px' }} />
                            </Col>
                            <Col xs="9" sm="9" style={{ margin: 'auto 0' }}>
                              <Row>
                                <h1 style={{ fontSize: '20px' }}>{e.title}</h1>
                              </Row>
                              <Row style={{ marginTop: '5px' }}>
                                <span style={{ fontSize: '15px' }}>{e.artist}</span>
                              </Row>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      </Col>
                      <Col xs="1" sm="1" style={{ margin: 'auto' }}>
                        <i onClick={()=>{
                          this.removeFavoriteTrack(e.id)
                        }} style={{ fontSize: '1.7em' }} className="fa fa-trash"></i>
                      </Col>
                    </Row>
                  </Col>
                })}
              </CardBody>
            </Card>
          </Col>


        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
