export function search(value) {
    return {
        type: 'header:SET_BUTTONS',
        payload: value
    }
}

export function searchBtnToggle(value) {
    return {
        type: 'header:SEARCH_TOGGLE',
        payload: value
    }
}