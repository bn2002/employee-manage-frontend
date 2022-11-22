import axios from "~/libs/axios";

const getPositions = async () => {
    try {
        let local = localStorage.getItem("position");
        let result;
        if (local === null) {
            result = await axios.get(`/position`);
            result = result.data;
            localStorage.setItem("position", JSON.stringify(result));
        } else {
            result = JSON.parse(local);
        }

        return result;
    } catch (error) {
        console.log(error);
    }
};

export { getPositions };
