let _default = {
    pageTitle: 'IDK',
    searchBtn: true,
    favouriteBtn: false
}

const headerReducer = (state = _default, action) => {
    switch(action.type) {
        case "header:SET_BUTTONS":
            state = {
                ...action.payload
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