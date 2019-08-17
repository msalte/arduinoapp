import React from "react";
import AppHeader from "../AppHeader";
import AppContent from "../AppContent";
import styles from "./styles.scss";
import classNames from "classnames";
import { Switch, Route } from "react-router-dom";

const AppWrapper = props => {
    return (
        <React.Fragment>
            <AppHeader {...props} />
            <AppContent {...props} />
        </React.Fragment>
    );
};
export default () => {
    return (
        <div className={classNames(styles.container)}>
            <Switch>
                <Route path="/" exact component={AppWrapper} />
                <Route path="/:segment" render={props => <AppWrapper {...props} />} />
            </Switch>
        </div>
    );
};
