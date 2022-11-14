import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Siderbar from "../components/Siderbar";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx("app")}>
            <Siderbar />
        </div>
    );
}

export default DefaultLayout;
