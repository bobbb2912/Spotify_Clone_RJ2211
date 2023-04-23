import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import currentTrackStyles from '../css/CurrentTrack.module.css'
import axios from 'axios';
import { getCurrentTrack } from '../features/login/loginSlice';

export default function CurrentTrack() {
    const loginReducer = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const currentTrack = async () => {
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
        };
        currentTrack();
    
    }, [loginReducer.token]);
  return (
    <div>
        {
            loginReducer.currentlyPlaying && (
                <div className={currentTrackStyles.track}>
                    <div className={currentTrackStyles.track__image}>
                        <img src={loginReducer.currentlyPlaying.image} alt='currentlyPlaying' />
                    </div>
                    <div className={currentTrackStyles.track__info}>
                        <h4>{loginReducer.currentlyPlaying.name}</h4>
                        <h6>{loginReducer.currentlyPlaying.artists.join(", ")}</h6>
                    </div>

                </div>
            )
        }
    </div>
  )
}
