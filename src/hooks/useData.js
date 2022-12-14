import { useContext } from "react";
import Context from "~/store/Context";
const useData = () => {
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
};

export default useData;
