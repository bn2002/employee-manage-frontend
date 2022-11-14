import classNames from "classnames/bind";
import Menu from "../Menu/Menu";
import styles from "./Siderbar.module.scss";
import logo from "~/assets/cukcuk-logo.png";
import toggle from "~/assets/img/toggle.png";
const cx = classNames.bind(styles);
function Siderbar() {
    return (
        <div className={cx("siderbar")}>
            <div className={cx("siderbar__top")}>
                <a className={cx("toggle")} href="/#">
                    <img
                        src={toggle}
                        alt=""
                        className={cx("siderbar__toggle-img")}
                    />
                </a>

                <a href="/#" className={cx("logo")}>
                    <img src={logo} alt="" className={cx("siderbar__img")} />
                </a>
            </div>

            <Menu></Menu>
        </div>
    );
}

export default Siderbar;
