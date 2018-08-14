import {
    Player,
    MediaStates
} from 'react-native-audio-toolkit';

let _default = {
    currentSongId: 0,
    isPlaying: false,
    progress: 0,
    repeat: false,
    shuffle: false,
    player: new Player()
}

let playbackOptions = {
    autoDestroy: false,
    continuesToPlayInBackground: true
}

const playerReducer = (state = _default, action) => {
    switch(action.type) {
        case "player:SET_PLAYER_ITEM":
            alert('Access Violation!');
            if (action.name == 'repeat') {
                alert('changing repeat');
                state = {
                    ...state,
                    repeat: action.value
                }
            } else if (action.name == 'shuffle') {
                alert('changing shuffle');
                state = {
                    ...state,
                    shuffle: action.value
                }
            }
            break;
        case "player:SET_SONG_ID":
            state = {
                ...state,
                currentSongId: action.payload.id,
                isPlaying: true
            }
            if (state.player != null)
                state.player.destroy();
            state.player = new Player(action.payload.path, playbackOptions);
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
            state.player = new Player(action.payload.path, playbackOptions);
            state.player.prepare();
            break;
        case "player:SET_PROGRESS":
            state = {
                ...state,
                progress: action.payload
            }
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

export default playerReducer;