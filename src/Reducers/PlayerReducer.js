import {
    Player,
    MediaStates
} from 'react-native-audio-toolkit';

let _default = {
    currentSongId: 0,
    isPlaying: false,
    player: new Player()
}

const headerReducer = (state = _default, action) => {
    switch(action.type) {
        case "player:SET_SONG_ID":
            state = {
                ...state,
                currentSongId: action.payload.id,
                isPlaying: true
            }
            if (state.player != null)
                state.player.destroy();
            state.player = new Player(action.payload.path);
            state.player.play();
            break;
        case "player:PREPARE_AT_PATH":
            state = {
                ...state,
                currentSongId: action.payload.id,
                isPlaying: false
            }
            if (state.player != null)
                state.player.destroy();
            state.player = new Player(action.payload.path);
            state.player.prepare();
            break;
        case "player:TOGGLE_PLAYER":
            state = {
                ...state,
                isPlaying: !state.isPlaying
            }
            state.player.playPause();
            break;
        case "player:PLAY_PLAYER":
            state = {
                ...state,
                isPlaying: true
            }
            state.player.play();
            break;
        case "player:PAUSE_PLAYER":
            state = {
                ...state,
                isPlaying: false
            }
            state.player.pause();
            break;
        default:
            break;
    }

    return state;
}

export default headerReducer;