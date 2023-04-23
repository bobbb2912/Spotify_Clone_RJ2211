import React, { useEffect } from 'react'
import bodyStyles from '../css/Body.module.css'
import { AiFillClockCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { getCurrentTrack, getInitialPlaylist, getPlayerState } from '../features/login/loginSlice';
import Home from './Home';
import Search from './Search';
import Library from './Library';

export default function Body({headerBackground}) {
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const initialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${loginReducer.selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + loginReducer.token,
            "Content-Type": "application/json",
          },
        });
        console.log('response bodyplaylist', response);
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        track: response.data.tracks.items.map(({ track }) => (
          {
            id: track.id,
            name: track.name,
            artists: track.artists.map((artists) => artists.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          }
        )),

      };

      console.log('selectedPlaylist', selectedPlaylist);
      console.log('response initialPlaylist', response);
      dispatch(getInitialPlaylist(selectedPlaylist))
    };
    initialPlaylist();
  }, [loginReducer.token, loginReducer.selectedPlaylistId, loginReducer.selectedSideBar]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000)/1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`, 
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
      headers: {
          Authorization: "Bearer " + loginReducer.token,
          "Content-Type": "application/json",
      },
  });
  if(response.status===204) {
    const currentPlaying = {
      id, name, artists, image,
    };
    dispatch(getCurrentTrack(currentPlaying));
    dispatch(getPlayerState(true))
  } else {
    dispatch(getPlayerState(true))

  }
  };
  return (
    <div>
      {loginReducer.selectedSideBar==="home" ? <Home/> :
      loginReducer.selectedSideBar==="search" ? <Search/>:
      loginReducer.selectedSideBar==="library" ? <Library/>:
       ( 
        loginReducer.selectedPlaylist && (
          <>
            <div className={bodyStyles.playlist}>
              <div className={bodyStyles.image}>
                <img src={loginReducer.selectedPlaylist.image} alt='selectedPlaylist' />
              </div>
              <div className={bodyStyles.detail}>
                <span className={bodyStyles.type}>PLAYLIST</span>
                <h1 className={bodyStyles.title}>{loginReducer.selectedPlaylist.name}</h1>
                <p className={bodyStyles.description}>{loginReducer.selectedPlaylist.description}</p>
              </div>
            </div>

            <div className={bodyStyles.list}>
              <div className={headerBackground ? bodyStyles.header__rows_1 : bodyStyles.header__rows_2}>
                <div className={bodyStyles.col}>
                  <span>#</span>
                </div>
                <div className={bodyStyles.col}>
                  <span>TITLE</span>
                </div>
                <div className={bodyStyles.col}>
                  <span>ALBUM</span>
                </div>
                <div className={bodyStyles.col}>
                  <span><AiFillClockCircle/></span>
                </div>
              </div>

              <div className={bodyStyles.tracks}>
                {
                  loginReducer.selectedPlaylist.track.map(({ 
                    id, 
                    name, 
                    artists, 
                    image, 
                    duration, 
                    album, 
                    context_uri, 
                    track_number }, index) => {
                      return (
                        <div className={bodyStyles.row} 
                        key={index}
                        onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                          <div className={bodyStyles.col}>
                            <span>{index+1}</span>
                          </div>
                          <div className={`${bodyStyles.col} ${bodyStyles.detail}`}>
                            <img src={image} alt='track'/>
                            <div className={bodyStyles.info}>
                              <span className={bodyStyles.name}>{name}</span>
                              <span>{artists}</span>
                            </div>
                          </div>
                         
                          <div className={bodyStyles.col}>
                            <span>{album}</span>
                          </div>
                          <div className={bodyStyles.col}>
                            <span>{msToMinutesAndSeconds(duration)}</span>
                          </div>
                        </div>
                      );
                    })
                }
              </div>
            </div>
          </>
        )
      ) }
    </div>
  )
}
