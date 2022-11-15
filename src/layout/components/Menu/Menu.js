import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";
import { publicRoutes } from "~/routes";
import { useData } from "~/hooks";
import { setCurrentPath } from "~/store/action";
const cx = classNames.bind(styles);
function Menu() {
    const [state, dispatch] = useData();
    const { currentPath } = state;
    const handleClick = (path) => {
        dispatch(setCurrentPath(path));
    };
    return (
        <ul className={cx("menu")}>
            {publicRoutes.map((route, index) => {
                return (
                    <li
                        className={cx({
                            menu__item: true,
                            "menu__item--active": currentPath === route.path,
                        })}
                        key={index}
                        onClick={() => handleClick(route.path)}>
                        <Link to={route.path} className={cx("menu__link")}>
                            <img
                                src={require(`../../../assets/icon/${route.img}`)}
                                className={cx("menu__icon")}
                                alt="img"
                            />
                            <span>{route.title}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Menu;
