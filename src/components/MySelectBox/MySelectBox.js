import "react-widgets/styles.css";
import { Combobox } from "react-widgets/cjs";

function MySelectBox() {
    return (
        <Combobox
            defaultValue="Yellow"
            data={["Red", "Yellow", "Blue", "Orange"]}
        />
    );
}

export default MySelectBox;
