import React, { useCallback } from "react";
import Chart, { chartOptions } from "./Chart";
import { fetch } from "global/fetch";
import styles from "./styles.scss";
import { Icon, Card } from "semantic-ui-react";

const dataUrl = (tractor, segment, type) => `/tractors/${tractor}/segments/${segment}/${type}`;

export default ({ match }) => {
    const {
        params: { tractor, segment },
    } = match;

    const exhaustPromise = useCallback(() => fetch(dataUrl(tractor, segment, "exhaust")), [segment]);
    const pressurePromise = useCallback(() => fetch(dataUrl(tractor, segment, "pressure")), [segment]);
    const miscPromise = useCallback(() => fetch(dataUrl(tractor, segment, "misc")), [segment]);

    if (!tractor || !segment) {
        return (
            <Card color="blue">
                <Card.Content>
                    <Icon name="arrow right" /> Arduino graph collection
                </Card.Content>
                <Card.Content>Start by selecting a tractor and a segment in the top menu...</Card.Content>
            </Card>
        );
    }

    return (
        <div className={styles.container}>
            <Chart
                key={`Exhaust: ${segment}`}
                name="Exhaust temperatures (°C)"
                dataPromise={() => exhaustPromise()}
                optionsCreatorCallback={data => chartOptions(data, "Temperature", "C")}
            />
            <Chart
                key={`Pressure: ${segment}`}
                name="Pressure (bar)"
                dataPromise={() => pressurePromise()}
                optionsCreatorCallback={data => chartOptions(data, "Pressure", "bar")}
            />
            <Chart
                key={`Misc.: ${segment}`}
                name="Miscellaneous temperatures (°C)"
                dataPromise={() => miscPromise()}
                optionsCreatorCallback={data => chartOptions(data, "Temperature", "C")}
            />
        </div>
    );
};
