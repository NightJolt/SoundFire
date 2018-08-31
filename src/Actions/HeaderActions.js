export function setTitle(value) {
    return {
        type: 'header:SET_TITLE',
        payload: value
    }
}

export function searchBtnToggle(value) {
    return {
        type: 'header:SEARCH_TOGGLE',
        payload: value
    }
}