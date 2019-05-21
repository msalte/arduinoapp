import React, { useContext } from "react";
import { fetch } from "global/fetch";
import styles from "./styles.scss";
import ThemeContext from "components/ThemeContext";
import { useEnsureNavigationEffect } from "./hooks";
import Chart from "./Chart";
import exhaustOptions from "./chartOptions/exhaust";
import miscOptions from "./chartOptions/misc";
import pressureOptions from "./chartOptions/pressure";

export default ({ match }) => {
    const themeContext = useContext(ThemeContext);

    useEnsureNavigationEffect(match);

    const {
        params: { folder },
    } = match;

    const exhaustDataPromise = () =>
        fetch(`/data/${folder}/exhaust`);
    const pressureDataPromise = () =>
        fetch(`/data/${folder}/pressure`);
    const miscDataPromise = () =>
        fetch(`/data/${folder}/misc`);

    return (
        <div className={styles.arduinoContainer}>
            <Chart
                key={`Exhaust: ${folder}`}
                name="Exhaust temperatures (°C)"
                dataPromise={() => exhaustDataPromise()}
                optionsCreatorCallback={data =>
                    exhaustOptions(data, themeContext)
                }
            />
            <Chart
                key={`Pressure: ${folder}`}
                name="Pressure (bar)"
                dataPromise={() => pressureDataPromise()}
                optionsCreatorCallback={data =>
                    pressureOptions(data, themeContext)
                }
            />
            <Chart
                key={`Misc.: ${folder}`}
                name="Miscellaneous temperatures (°C)"
                dataPromise={() => miscDataPromise()}
                optionsCreatorCallback={data => miscOptions(data, themeContext)}
            />
        </div>
    );
};
