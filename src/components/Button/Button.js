import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
function Button({ to, href, onClick, icon, type, text, className }) {
    let Comp = "button";
    if (to) {
        Comp = "Link";
    } else if (href) {
        Comp = "a";
    }
    return (
        <>
            <Comp
                className={cx(
                    "btn",
                    `btn--${type}`,
                    "btn-group",
                    {
                        "btn--icon-only": typeof text === "undefined",
                    },
                    className
                )}
                onClick={onClick}>
                {icon && (
                    <span className={cx("btn__icon")}>
                        <FontAwesomeIcon icon={icon} />{" "}
                    </span>
                )}
                {text && <span class={cx("btn__text")}>{text}</span>}
            </Comp>
        </>
    );
}

export default Button;
