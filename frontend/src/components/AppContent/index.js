import React, { useCallback } from "react";
import Chart from "./Chart";
import { fetch } from "global/fetch";
import exhaustOptions from "./chartOptions/exhaust";
import miscOptions from "./chartOptions/misc";
import pressureOptions from "./chartOptions/pressure";
import styles from "./styles.scss";
import { Icon, Card } from "semantic-ui-react";

export default ({ match }) => {
    const {
        params: { tractor, segment },
    } = match;

    const exhaustDataPromise = useCallback(
        () => fetch(`/tractors/${tractor}/segments/${segment}/exhaust`),
        [segment]
    );
    const pressureDataPromise = useCallback(
        () => fetch(`/tractors/${tractor}/segments/${segment}/pressure`),
        [segment]
    );
    const miscDataPromise = useCallback(
        () => fetch(`/tractors/${tractor}/segments/${segment}/misc`),
        [segment]
    );

    if (!tractor || !segment) {
        return (
            <Card color="blue">
                <Card.Content>
                    <Icon name="arrow right" /> Arduino graph collection
                </Card.Content>
                <Card.Content>Start by selecting a segment in the top menu...</Card.Content>
            </Card>
        );
    }

    return (
        <div className={styles.container}>
            <Chart
                key={`Exhaust: ${segment}`}
                name="Exhaust temperatures (°C)"
                dataPromise={() => exhaustDataPromise()}
                optionsCreatorCallback={data => exhaustOptions(data)}
            />
            <Chart
                key={`Pressure: ${segment}`}
                name="Pressure (bar)"
                dataPromise={() => pressureDataPromise()}
                optionsCreatorCallback={data => pressureOptions(data)}
            />
            <Chart
                key={`Misc.: ${segment}`}
                name="Miscellaneous temperatures (°C)"
                dataPromise={() => miscDataPromise()}
                optionsCreatorCallback={data => miscOptions(data)}
            />
        </div>
    );
};
