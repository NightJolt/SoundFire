export function setSongId(value) {
    return {
        type: 'player:SET_SONG_ID',
        payload: value
    }
}

export function togglePlayer() {
    return {
        type: 'player:TOGGLE_PLAYER'
    }
}

export function playPlayer() {
    return {
        type: 'player:PLAY_PLAYER'
    }
}

export function pausePlayer() {
    return {
        type: 'player:PAUSE_PLAYER'
    }
}