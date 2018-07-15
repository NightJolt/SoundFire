let _default = {
    isSearching: false,
    value: ''
}

const searchReducer = (state = _default, action) => {
    switch(action.type) {
        case "search:SEARCH":
            state = {
                ...state,
                value: action.payload
            }
            break;
        case "search:TOGGLE_SEARCH_BAR":
            state = {
                ...state,
                isSearching: action.payload
            }
            break;
        default:
            break;
    }
    
    return state;
}

export default searchReducer;