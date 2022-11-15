import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import toggle from "~/assets/img/toggle.png";
import logo from "~/assets/cukcuk-logo.png";
import user from "~/assets/icon/avatar-default.png";
import option from "~/assets/icon/option.png";
import { useData } from "~/hooks";
import { setShowSiderbar } from "~/store/action";
const cx = classNames.bind(styles);
function Navbar() {
    const [state, dispatch] = useData();
    let { showSiderbar } = state;
    const handleClick = () => {
        dispatch(setShowSiderbar(!state.showSiderbar));
    };
    return (
        <nav className={cx("navbar")}>
            {!showSiderbar && (
                <div className={cx("navbar__control")}>
                    <Link
                        to="/"
                        className={cx("navbar__toggle")}
                        onClick={handleClick}>
                        <img src={toggle} alt="toggle" />
                    </Link>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className={cx("navbar__logo")}
                        />
                    </Link>
                </div>
            )}

            <div className={cx("navbar__wrapper")}>
                <div className={cx("navbar__title")}>
                    <span>Nhà hàng Biển Đông</span>
                </div>
                <div className={cx("navbar__user")}>
                    <img src={user} alt="avatar" class={cx("user__img")} />
                    <span class={cx("user__name")}>Nguyễn Duy Doanh</span>
                    <div class={cx("navbar__action")}>
                        <img
                            src={option}
                            alt="option"
                            class={cx("navbar__icon")}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
