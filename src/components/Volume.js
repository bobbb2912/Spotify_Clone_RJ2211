import React from 'react'
import volumeStyles from '../css/Volume.module.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

export default function Volume() {
  const loginReducer = useSelector((state) => state.loginReducer);

  const setVolume = async (e) => {
    const response = await axios.put(
      'https://api.spotify.com/v1/me/player/volume', {}, 
      {
        params: {
          volume_percent: parseInt(e.target.value)
        },
        headers : {
          Authorization: "Bearer " + loginReducer.token,
          "Content-Type": "application/json",
      },
  }); 
  }
  return (
    <div className={volumeStyles.volume}>
      <input type='range' min={0} max={100} onMouseUp={(e) => setVolume(e)}/>
    </div>
  )
}
