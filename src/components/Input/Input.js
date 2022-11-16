import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function Input({ placeholder, inputType, inputIcon }) {
    return (
        <div className={cx("input")}>
            <FontAwesomeIcon icon={faSearch} className={cx("input__icon")} />
            <input
                type="text"
                className={cx("input__control")}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;
