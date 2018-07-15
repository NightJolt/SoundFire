export function search(value) {
    return {
        type: 'search:SEARCH',
        payload: value
    }
}

export function toggleSearchBar(value) {
    return {
        type: 'search:TOGGLE_SEARCH_BAR',
        payload: value
    }
}