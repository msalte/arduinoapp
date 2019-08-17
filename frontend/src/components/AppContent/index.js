import React from "react";
import Chart from "./Chart";
import { fetch } from "global/fetch";
import exhaustOptions from "./chartOptions/exhaust";
import miscOptions from "./chartOptions/misc";
import pressureOptions from "./chartOptions/pressure";
import styles from "./styles.scss";

export default ({ match }) => {
    const {
        params: { segment },
    } = match;

    if (!segment) {
        return <div>Hello world!</div>;
    }

    const exhaustDataPromise = () => fetch(`/data/${segment}/exhaust`);
    const pressureDataPromise = () => fetch(`/data/${segment}/pressure`);
    const miscDataPromise = () => fetch(`/data/${segment}/misc`);

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
