import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import searchStyles from '../css/Search.module.css'
import Navbar from './Navbar';
import {FaSearch} from 'react-icons/fa'

export default function Search({}) {
  const [searchInput, setSearchInput] = useState("");
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);
  const search = async () => {
    console.log('search for ' + searchInput);

    // get request using search to get the Artists ID
    const artistIDResponse = await axios.get(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist", 
      {
        headers : {
            Authorization: "Bearer " + loginReducer.token,
            "Content-Type": "application/json",
        },
      });
      console.log('artistIDResponse', artistIDResponse);
      // console.log('albums', artistIDResponse);

      const albumsResponse = await axios.get(
        "https://api.spotify.com/v1/artists/" + artistIDResponse.data.artists.items[0].id + "/albums?include_groups=album&market=VN&limit=50", 
        {
          headers : {
              Authorization: "Bearer " + loginReducer.token,
              "Content-Type": "application/json",
          },
        });
        setAlbums(albumsResponse.data.items);
        console.log('albums', albumsResponse);
    //  Get request with Artist ID grab all the albums from that artist

    // display those albums to the user
  }
  return (
    <div>
      <div className={searchStyles.search}>
        <Row className='mx-2 row row-cols-4'>
          {loginReducer.searchAlbums.map((album, i) => {
            return (
              <Card key={i}  className={searchStyles.card}>
                <Card.Img src={album.images[0].url}/>
                <Card.Body>
                  <Card.Title className={searchStyles.card__title}>{album.name}</Card.Title>
                </Card.Body>
              </Card> 
            )
          })}
        </Row>
      </div>
    </div>

  )
}
