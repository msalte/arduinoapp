import React, { useContext } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeContext, { themes } from "components/ThemeContext";

export default props => {
    const themeContext = useContext(ThemeContext);

    return (
        <div className={classNames(styles.topbar, props.className)}>
            <Link to={"/"} className={styles.brand}>
                Arduino app
            </Link>
            <div className={styles.tools}>
                <Button iconButton onClick={() => themeContext.toggle()}>
                    <FontAwesomeIcon icon={themeContext.theme === themes.dark ? "sun" : "moon"} />
                </Button>
            </div>
        </div>
    );
};
