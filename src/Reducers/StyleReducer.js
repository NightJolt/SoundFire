let _default = {
    mainColor: "#32cd32",
    darkGrey: "rgb(55, 55, 55)",
    grey: "rgb(60, 60, 60)",
    lightGrey: "rgb(120, 120, 120)",
    wtfGrey: "rgb(90, 90, 90)",
    lightBlack: "rgb(45, 45, 45)",
    aqua: "rgb(0, 255, 255)",
    lime: "rgb(0, 255, 0)",
    orange: "rgb(255, 130, 0)",
    red: "rgb(255, 50, 50)",
    blue: "rgb(80, 80, 255)",
    yellow: "rgb(255, 255, 0)",
    purple: "rgb(255, 0, 255)",
    blue: "rgb(66, 134, 244)",
    darkWhite: "rgb(245, 245, 245)"
}

const styleReducer = (state = _default, action) => {
    switch(action.type) {
        case "style:SET_MAINCOLOR":
            state = {
                ...state,
                mainColor: action.payload
            }
            break;
        default:
            break;
    }
    
    return state;
}

export default styleReducer;