import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Siderbar from "../components/Siderbar";
import Navbar from "../components/Navbar";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx("app")}>
            <Siderbar />
            <div className={cx("wrapper")}>
                <Navbar />
            </div>
        </div>
    );
}

export default DefaultLayout;
