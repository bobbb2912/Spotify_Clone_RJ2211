import axios from 'axios';
import React, {useEffect} from 'react'
import { Card, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTopTrack } from '../features/login/loginSlice';

export default function Home() {
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const topTracks = async () => {
      const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term`, 
          {
          headers : {
              Authorization: "Bearer " + loginReducer.token,
              "Content-Type": "application/json",
          },
      });
      const {items} = response;
      console.log('top tracks', response);
      // const top = items.map(({name, id}) => {
      //     return {name, id};
      // });
      dispatch(getTopTrack(items));
  };
    topTracks();
  }, [loginReducer.token, loginReducer.topTracks]);
  
  
  return (
    <div>
      <div>
        <Row className='mx-2 row row-cols-4'>
          { loginReducer.topTracks && loginReducer.topTracks.map(({name, artists}, i) => {
            return (
              <Card key={i} >
                <Card.Header src={name}/>
                <Card.Body>
                  <Card.Title >{artists.name}</Card.Title>
                </Card.Body>
              </Card> 
            )
          })}
        </Row>
      </div>
    </div>

  )
}
