import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
    name : 'music' ,
    initialState : {
        showMusicPlayer : false ,
        activeMusic : null ,
        isPlaying : false , 
    } , 
    reducers : {
        setShowMusicPlayer (state , action) {
            state.showMusicPlayer = action.payload;
        } ,
        setActiveMusic (state , action ) {
            state.activeMusic = action.payload
        } ,
        setIsPlaying (state , action) {
            state.isPlaying = action.payload;
        }

    }
});

export const { 
    setShowMusicPlayer , setActiveMusic , setIsPlaying
} = musicSlice.actions;

export default musicSlice.reducer;