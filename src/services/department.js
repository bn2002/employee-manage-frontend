import axios from "~/libs/axios";
const getDepartments = async () => {
    try {
        let local = localStorage.getItem("department");
        let result;
        if (local === null) {
            result = await axios.get(`/department`);
            result = result.data;
            localStorage.setItem("department", JSON.stringify(result));
        } else {
            result = JSON.parse(local);
        }

        return result;
    } catch (error) {
        console.log(error);
    }
};

export { getDepartments };
