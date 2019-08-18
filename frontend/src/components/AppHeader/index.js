import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import classNames from "classnames";
import { fetch } from "global/fetch";
import { Dropdown, Loader, Icon, Menu } from "semantic-ui-react";
import { LargerThanPhone, isPhone } from "../Responsive";

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

    useEffect(() => {
        setSelectedSegment(segment);
    }, [segment]);

    return (
        <Menu stackable borderless className={classNames(styles.container)}>
            <Menu.Item>
                <Link to="/" onClick={() => setSelectedSegment("")}>
                    <Icon name="home" />
                </Link>
            </Menu.Item>
            <Menu.Item header fitted={!isPhone()}>
                Select segment
            </Menu.Item>
            <Menu.Item name="segment">
                {isFetching && <Loader active>Loading segments...</Loader>}
                {error && error}
                <Dropdown
                    search
                    style={{ width: 400 }}
                    key={selectedSegment}
                    onChange={(_, data) => handleSelect(data.value)}
                    selection
                    placeholder="Type to search..."
                    defaultValue={selectedSegment}
                    options={segments.map(s => ({
                        key: s,
                        text: decodeURIComponent(s),
                        value: decodeURIComponent(s),
                    }))}
                />
            </Menu.Item>
            <LargerThanPhone>
                <Menu.Item
                    disabled
                    onClick={() => console.log("clicked options")}
                    position="right"
                    name="options"
                >
                    <Icon name="wrench" /> Options
                </Menu.Item>
            </LargerThanPhone>
        </Menu>
    );
};
