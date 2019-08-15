import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { fetch } from "global/fetch";
import { Dropdown, Loader, Icon } from "semantic-ui-react";

export default ({ onSegmentSelected }) => {
    const [segments, setSegments] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFetching(true);

        try {
            fetch("/data/folders").then(data => {
                setSegments(data);
            });
        } catch (error) {
            setError(error);
        }

        setFetching(false);
    }, []);

    const handleSelect = useCallback(segment => {
        onSegmentSelected(segment);
    }, []);

    return (
        <div className={classNames(styles.container)}>
            {error && error}
            {isFetching && <Loader active>Loading segments...</Loader>}
            <Icon name="area graph" />
            <span>Select segment</span>
            <Dropdown
                onChange={(_, data) => handleSelect(data.value)}
                selection
                placeholder="Select segment"
                options={segments.map(s => ({
                    key: s,
                    text: decodeURIComponent(s),
                    value: decodeURIComponent(s),
                }))}
            />
        </div>
    );
};
