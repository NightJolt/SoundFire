let _default = {
    autoClosingDrawer: true,
    crazyMode: false
}

const optionsReducer = (state = _default, action) => {
    switch(action.type) {
        case "settings:TOGGLE_AUTO_CLOSING_DRAWER":
            state = {
                ...state,
                autoClosingDrawer: !state.autoClosingDrawer
            }
            break;
        case "settings:TOGGLE_CRAZY_MODE":
            state = {
                ...state,
                crazyMode: !state.crazyMode
            }
            break;
        default:
            break;
    }

    return state;
}

export default optionsReducer;