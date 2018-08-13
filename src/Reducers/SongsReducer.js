let _default = {
    loaded: false,
    fullLength: 0,
    songList: [],
    lyrics: []
}

const songsReducer = (state = _default, action) => {
    switch(action.type) {
        case "songs:SET_LIST_FULFILLED":
            let tracks = action.payload;
            let fullLength = 0;

            for (let i=0;i<tracks.length;i++) {
                tracks[i].id = i + 1;
                
                tracks[i].image = require(tracks[i].cover);
                
                let millsec = tracks[i].duration;
                let hour = Math.floor(millsec / 3600000);
                millsec %= 3600000;
                let min = Math.floor(millsec / 60000);
                millsec %= 60000;
                let sec = Math.floor(millsec / 1000);
                fullLength += sec
                let time = null;
                if (sec < 10)
                    sec = '0' + sec;
                if (hour > 0)
                    time = hour + ':' + min + ':' + sec;
                else
                    time = min + ':' + sec;
                tracks[i].time = time;

                if (tracks[i].title == null) {
                    let path = tracks[i].path;
                    let arr = path.split("/")
                    let file = arr[arr.length - 1];
                    let title = file.replace('.mp3', '')
                    tracks[i].title = title;
                }

                if (tracks[i].author == null) {
                    tracks[i].author = "Unknown Author";
                }
            }
            
            state = {
                ...state,
                loaded: true,
                songList: tracks,
                fullLength: fullLength
            }
            
            console.log(state);
            break;
        case "songs:SET_LOAD_STATE":
            state = {
                ...state,
                loaded: action.payload
            }
            break;
        case "songs:WIPE_DATA":
            state = {
                ...state,
                songList: [],
                lyrics: []
            }
            break;
        default:
            break;
    }

    return state;
}

export default songsReducer;