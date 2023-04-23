import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './loginAPI';

const initialState = {
  token: null,
  playlists:[],
  userInfo: null,
  selectedPlaylistId: null,
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  selectedSideBar:null,
  searchAlbums:[],
  topTracks: [],
};


// export const incrementAsync = createAsyncThunk(
//   'login',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.token=action.payload;
    },
    getPlaylists:(state, action) => {
      state.playlists = action.payload;
    },
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    getInitialPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    getCurrentTrack: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    getPlayerState: (state, action) => {
      state.playerState = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
    setSelectedSideBar: (state, action) => {
      state.selectedSideBar = action.payload;
    },
    getSearchAlbum: (state, action) => {
      state.searchAlbums = action.payload;
    },
    getTopTrack: (state, action) => {
      state.topTracks = action.payload;
    }
    
  },
  extraReducers: (builder) => {
    
    
  },
});

export const { 
  getToken, 
  getPlaylists, 
  getUserInfo, 
  getInitialPlaylist,
  getCurrentTrack,
  getPlayerState,
  setPlaylistId,
  setSelectedSideBar,
  getSearchAlbum,
  getTopTrack } = loginSlice.actions;

export default loginSlice.reducer;
