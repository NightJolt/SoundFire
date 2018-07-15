let _default = {
    currentPage: 2
}

const contentReducer = (state = _default, action) => {
    switch(action.type) {
        case "content:SET_PAGE":
            state = {
                ...state,
                currentPage: action.payload
            }
			break;
        default:
            break;
    }

    return state;
}

export default contentReducer;