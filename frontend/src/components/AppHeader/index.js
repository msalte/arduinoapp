import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import classNames from "classnames";
import { fetch } from "global/fetch";
import { Dropdown, Loader, Icon } from "semantic-ui-react";

export default ({ match, history }) => {
    const {
        params: { segment },
    } = match;

    const [selectedSegment, setSelectedSegment] = useState(segment);
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
        history.push("/" + segment);
    }, []);

    return (
        <div className={classNames(styles.container)}>
            {error && error}
            {isFetching && <Loader active>Loading segments...</Loader>}
            <Link to="/" onClick={() => setSelectedSegment("")}>
                <Icon name="area graph" />
            </Link>
            <span>Select segment</span>
            <Dropdown
                key={selectedSegment}
                onChange={(_, data) => handleSelect(data.value)}
                selection
                placeholder="Select segment"
                defaultValue={selectedSegment}
                options={segments.map(s => ({
                    key: s,
                    text: decodeURIComponent(s),
                    value: decodeURIComponent(s),
                }))}
            />
        </div>
    );
};
