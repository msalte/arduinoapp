import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import classNames from "classnames";
import { fetch } from "global/fetch";
import { Dropdown, Loader, Icon, Menu } from "semantic-ui-react";
import { LargerThanPhone, isPhone } from "../Responsive";

const TractorPicker = ({ defaultValue, onSelect }) => {
    const [tractors, setTractors] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const getTractorsAsync = async () => {
        setFetching(true);
        setError(null);
        try {
            await fetch("/tractors").then(tractors => {
                setTractors(tractors);
            });
        } catch (error) {
            setError(error);
        }
        setFetching(false);
    };

    useEffect(() => {
        getTractorsAsync();
    }, []);

    return (
        <Menu.Item name="tractor">
            {isFetching && <Loader size="tiny" active />}
            {error && error}
            <Icon name="microchip" />
            <Dropdown
                key={defaultValue}
                search
                disabled={isFetching}
                style={{ width: 200 }}
                onChange={onSelect}
                selection
                placeholder="Type to search..."
                defaultValue={defaultValue}
                options={tractors.map(s => ({
                    key: s,
                    text: decodeURIComponent(s),
                    value: decodeURIComponent(s),
                }))}
            />
        </Menu.Item>
    );
};

const SegmentPicker = ({ tractor, defaultValue, onSelect }) => {
    const [segments, setSegments] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const getSegmentsAsync = async tractor => {
        setFetching(true);
        setError(null);
        try {
            await fetch(`/tractors/${tractor}/segments`).then(segments => {
                setSegments(segments);
            });
        } catch (error) {
            setError(error);
        }
        setFetching(false);
    };

    useEffect(() => {
        getSegmentsAsync(tractor);
    }, [tractor]);

    return (
        <Menu.Item name="segment">
            {isFetching && <Loader size="tiny" active />}
            {error && error}
            <Icon name="chart line" />
            <Dropdown
                disabled={isFetching || tractor === undefined}
                search
                style={{ width: 400 }}
                onChange={onSelect}
                selection
                placeholder="Type to search..."
                defaultValue={defaultValue}
                options={segments.map(s => ({
                    key: s,
                    text: decodeURIComponent(s),
                    value: decodeURIComponent(s),
                }))}
            />
        </Menu.Item>
    );
};

export default ({ match, history }) => {
    const {
        params: { tractor, segment },
    } = match;

    const [selectedTractor, setSelectedTractor] = useState(tractor);
    const [selectedSegment, setSelectedSegment] = useState(segment);

    const handleTractorSelect = useCallback((_, selectedValue) => {
        const tractor = selectedValue.value;
        setSelectedTractor(tractor);
    }, []);

    const handleSegmentSelect = useCallback(
        (_, selectedValue) => {
            const segment = selectedValue.value;

            setSelectedSegment(segment);
            history.push(`/${selectedTractor}/${segment}`);
        },
        [selectedTractor, selectedSegment]
    );

    const handleHomeClick = useCallback(() => {
        setSelectedTractor(undefined);
        setSelectedSegment(undefined);
    }, []);

    return (
        <Menu stackable borderless className={classNames(styles.container)}>
            <Menu.Item>
                <Link to="/" onClick={handleHomeClick}>
                    <Icon name="home" />
                </Link>
            </Menu.Item>
            <Menu.Item header fitted={!isPhone()}>
                Select tractor
            </Menu.Item>
            <TractorPicker defaultValue={selectedTractor} onSelect={handleTractorSelect} />
            <Menu.Item header fitted={!isPhone()}>
                Select segment
            </Menu.Item>
            <SegmentPicker
                tractor={selectedTractor}
                defaultValue={selectedSegment}
                onSelect={handleSegmentSelect}
            />
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
