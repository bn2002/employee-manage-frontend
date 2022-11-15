import classNames from "classnames/bind";
import Menu from "../Menu/Menu";
import styles from "./Siderbar.module.scss";
import logo from "~/assets/cukcuk-logo.png";
import toggle from "~/assets/img/toggle.png";
import { useData } from "~/hooks";
import { setShowSiderbar } from "~/store/action";

const cx = classNames.bind(styles);
function Siderbar() {
    const [state, dispatch] = useData();
    const handleClick = () => {
        dispatch(setShowSiderbar(!state.showSiderbar));
    };
    return (
        <div className={cx("siderbar")}>
            <div className={cx("siderbar__top")}>
                <a className={cx("toggle")} href="/#" onClick={handleClick}>
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
