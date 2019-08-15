import React from "react";
import Chart from "./Chart";
import { fetch } from "global/fetch";
import exhaustOptions from "./chartOptions/exhaust";
import miscOptions from "./chartOptions/misc";
import pressureOptions from "./chartOptions/pressure";
import styles from "./styles.scss";

export default ({ currentSegment }) => {
    if (!currentSegment) {
        return <div>Hello world!</div>;
    }

    const exhaustDataPromise = () => fetch(`/data/${currentSegment}/exhaust`);
    const pressureDataPromise = () => fetch(`/data/${currentSegment}/pressure`);
    const miscDataPromise = () => fetch(`/data/${currentSegment}/misc`);

    return (
        <div className={styles.container}>
            <Chart
                key={`Exhaust: ${currentSegment}`}
                name="Exhaust temperatures (°C)"
                dataPromise={() => exhaustDataPromise()}
                optionsCreatorCallback={data => exhaustOptions(data)}
            />
            <Chart
                key={`Pressure: ${currentSegment}`}
                name="Pressure (bar)"
                dataPromise={() => pressureDataPromise()}
                optionsCreatorCallback={data => pressureOptions(data)}
            />
            <Chart
                key={`Misc.: ${currentSegment}`}
                name="Miscellaneous temperatures (°C)"
                dataPromise={() => miscDataPromise()}
                optionsCreatorCallback={data => miscOptions(data)}
            />
        </div>
    );
};
