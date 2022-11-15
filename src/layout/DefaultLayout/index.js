import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Siderbar from "../components/Siderbar";
import Navbar from "../components/Navbar";
import { useData } from "~/hooks";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    let [state, dispatch] = useData();
    let { showSiderbar } = state;
    return (
        <div className={cx("app")}>
            {showSiderbar && <Siderbar />}
            <div className={cx("wrapper")}>
                <Navbar />
                <div
                    className={cx({
                        content: true,
                        "content--pading": !showSiderbar,
                    })}>
                    <div className={cx("grid")}>
                        <div className={cx("row")}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
