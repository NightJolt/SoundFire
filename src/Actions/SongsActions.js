import MusicFiles from 'react-native-get-music-files';

export function setLoadState(value) {
    return {
        type: "songs:SET_LOAD_STATE",
        payload: value
    }
}

export function getListFromDevice() {
    return syncDevice();
}

export function syncDevice() {
    return {
        type: "songs:SET_LIST",
        payload: MusicFiles.getAll({
            blured : false, // works only when 'cover' is set to true
            artist : true,
            duration : true, //default : true
            cover : false, //default : true,
            genre : true,
            title : true,
            cover : true,
            minimumSongDuration : 10000, //get songs bigger than 10000 miliseconds duration
            fields : ['title','albumTitle','genre','lyrics','artwork','duration'] //for iOs Version
        })
    };
}