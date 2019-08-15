import React, { useState, useCallback } from "react";
import AppHeader from "../AppHeader";
import AppContent from "../AppContent";
import styles from "./styles.scss";
import classNames from "classnames";

export default () => {
    const [currentSegment, setCurrentSegment] = useState(null);

    const onSegmentSelected = useCallback(newSegment => {
        setCurrentSegment(newSegment);
    }, []);

    return (
        <div className={classNames(styles.container)}>
            <AppHeader onSegmentSelected={onSegmentSelected} />
            <AppContent currentSegment={currentSegment} />
        </div>
    );
};
