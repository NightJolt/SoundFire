let _default = {
    pageTitle: 'Playing Now',
    searchBtn: false,
    favouriteBtn: false
}

const headerReducer = (state = _default, action) => {
    switch(action.type) {
        case "header:SET_TITLE":
            state = {
                pageTitle: action.payload
            }
            break;
        case "header:SEARCH_TOGGLE":
            state = {
                ...state,
                searchBtn: action.payload
            }
            break;
            
        default:
            break;
    }

    return state;
}

export default headerReducer;