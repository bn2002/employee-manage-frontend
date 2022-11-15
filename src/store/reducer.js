import { SET_CURRENT_PATH, SET_SHOW_SIDERBAR } from "./constants";

const initState = {
    currentPath: "/",
    showSiderbar: true,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.payload,
            };
        case SET_SHOW_SIDERBAR:
            return {
                ...state,
                showSiderbar: action.payload,
            };
        default:
            throw new Error("Action invalid");
    }
}

export default reducer;
export { initState };
