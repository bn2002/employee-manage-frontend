const {
    SET_CURRENT_PATH,
    SET_SHOW_SIDERBAR,
    SET_FILTER_POSITION,
    SET_FILTER_DEPARTMENT,
    SET_FILTER_INPUT,
    SET_PER_PAGE,
    SET_CURRENT_PAGE,
} = require("./constants");

const setCurrentPath = (payload) => {
    return {
        type: SET_CURRENT_PATH,
        payload,
    };
};

const setShowSiderbar = (payload) => {
    return {
        type: SET_SHOW_SIDERBAR,
        payload,
    };
};

const setFilterPosition = (payload) => {
    return {
        type: SET_FILTER_POSITION,
        payload,
    };
};

const setFilterDepartment = (payload) => {
    return {
        type: SET_FILTER_DEPARTMENT,
        payload,
    };
};

const setFilterInput = (payload) => {
    return {
        type: SET_FILTER_INPUT,
        payload,
    };
};

const setCurrentPage = (payload) => {
    return {
        type: SET_CURRENT_PAGE,
        payload,
    };
};

const setPerPage = (payload) => {
    return {
        type: SET_PER_PAGE,
        payload,
    };
};
export {
    setCurrentPath,
    setShowSiderbar,
    setFilterPosition,
    setFilterDepartment,
    setFilterInput,
    setCurrentPage,
    setPerPage,
};
