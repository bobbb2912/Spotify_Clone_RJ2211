import React, {useState, useEffect} from 'react'
import navbarStyles from '../css/Navbar.module.css'
import {FaSearch} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search'
import { getSearchAlbum, getToken } from '../features/login/loginSlice'

export default function Navbar({navBackground}) {
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
        dispatch(getSearchAlbum(albums));
    //  Get request with Artist ID grab all the albums from that artist

    // display those albums to the user
  }
  const logout = () => {
    dispatch(getToken(null));
  }
  useEffect(() => {
    search();
  }, [loginReducer.token, loginReducer.searchAlbums]);
  return (
    <Container className={navBackground ? navbarStyles.navbar__background_1 : navbarStyles.navbar__background_2} >
      <div className={navbarStyles.search__bar}>
        <FaSearch/>
        <input onKeyPress={(event) => {
            if(event.key=="Enter") {
              search();
            }
          }}
          onChange={(event)=>setSearchInput(event.target.value)}
         type='text' placeholder='Artists, songs, or podcasts' />
      </div>
      <div className={navbarStyles.avatar}>
        <a href='#'>
          <CgProfile/>
          <span>{loginReducer.userInfo?.userName}</span>
          {/* console.log('username',{loginReducer.userInfo?.name}); */}
        </a>
        <a href='#'>
          <FiLogOut onClick={() => logout()}/>
        </a>
      </div>
 
    </Container>
  )
}
