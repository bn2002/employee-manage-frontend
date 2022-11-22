import {
    SET_CURRENT_PAGE,
    SET_CURRENT_PATH,
    SET_FILTER_DEPARTMENT,
    SET_FILTER_INPUT,
    SET_FILTER_POSITION,
    SET_PER_PAGE,
    SET_SELECTED_ROW,
    SET_SHOW_SIDERBAR,
} from "./constants";

const initState = {
    currentPage: 0,
    perPage: 25,
    currentPath: "/",
    showSiderbar: true,
    filterPosition: "",
    filterDepartment: "",
    filterInput: "",
    selectedRow: [],
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
        case SET_FILTER_DEPARTMENT:
            return {
                ...state,
                filterDepartment: action.payload,
            };
        case SET_FILTER_POSITION:
            return {
                ...state,
                filterPosition: action.payload,
            };
        case SET_FILTER_INPUT:
            return {
                ...state,
                filterInput: action.payload,
            };
        case SET_PER_PAGE:
            return {
                ...state,
                perPage: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_SELECTED_ROW:
            return {
                ...state,
                selectedRow: action.payload,
            };
        default:
            throw new Error("Action invalid");
    }
}

export default reducer;
export { initState };
