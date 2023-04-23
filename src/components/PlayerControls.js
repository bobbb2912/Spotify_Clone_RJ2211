import React from 'react'
import playerControlsStyles from '../css/PlayerControls.module.css'
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle} from 'react-icons/bs'
import {CgPlayTrackNext, CgPlayTrackPrev} from 'react-icons/cg'
import {FiRepeat} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getCurrentTrack } from '../features/login/loginSlice'
import { getPlayerState } from '../features/login/loginSlice'

export default function PlayerControls() {
    const loginReducer = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch();

    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`, 
            {},
            {
            headers : {
                Authorization: "Bearer " + loginReducer.token,
                "Content-Type": "application/json",
            },
        });

        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing", 
            {
            headers : {
                Authorization: "Bearer " + loginReducer.token,
                "Content-Type": "application/json",
            },
        });
    
        console.log('curentTrack',response);

        if(response.data !=="") {
            const {item} = response.data;
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artists: item.artists.map((artists) => artists.name),
                image: item.album.images[2].url,

            };
            dispatch(getCurrentTrack(currentlyPlaying));

        } else {
            dispatch(getCurrentTrack(null));
        }

        console.log('player controls', response);
    };
    const changeState = async () => {
        const state = loginReducer.playerState ? "pause" : "play";
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`, {}, 
            {
            headers : {
                Authorization: "Bearer " + loginReducer.token,
                "Content-Type": "application/json",
            },
        });
        dispatch(getPlayerState(!loginReducer.playerState))

    };
  return (
    <div className={playerControlsStyles.playerControls}>
       <div className={playerControlsStyles.shuffle}>
            <BsShuffle/>
        </div> 
        <div className={playerControlsStyles.previous}>
            <CgPlayTrackPrev onClick={()=>changeTrack("previous")}/>
        </div>
        <div className={playerControlsStyles.state}>
            {loginReducer.playerState ? <BsFillPauseCircleFill onClick={changeState}/> : <BsFillPlayCircleFill onClick={changeState}/>}
        </div>
        <div className={playerControlsStyles.next}>
            <CgPlayTrackNext onClick={()=>changeTrack("next")}/>
        </div>
        <div className={playerControlsStyles.repeat}>
            <FiRepeat/>
        </div>
    </div>
  )
}
