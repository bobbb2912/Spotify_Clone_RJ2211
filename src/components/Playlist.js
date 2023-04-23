import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios  from 'axios';
import { getPlaylists, setPlaylistId, setSelectedSideBar } from '../features/login/loginSlice';
import playlistStyles from '../css/Playlists.module.css'
export default function Playlist() {
    const loginReducer = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists", 
                {
                headers : {
                    Authorization: "Bearer " + loginReducer.token,
                    "Content-Type": "application/json",
                },
            });
            const {items} = response.data;
            // console.log('item',items);
            const playlists = items.map(({name, id}) => {
                return {name, id};
            });
            console.log(playlists);
            dispatch(getPlaylists(playlists));
        };
        getPlaylistData();
    
    }, [loginReducer.token]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch(setSelectedSideBar(null));
        dispatch(setPlaylistId(selectedPlaylistId));
    };
  return (
    <div className={playlistStyles.playlists}>
       
        <ul>
            {loginReducer.playlists.map(({name, id}) => {
                return (
                    <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
                )
            })}
            
           
        </ul> 
    </div>
  )
}
