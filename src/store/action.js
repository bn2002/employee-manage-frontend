const { SET_CURRENT_PATH, SET_SHOW_SIDERBAR } = require("./constants");

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

export { setCurrentPath, setShowSiderbar };
