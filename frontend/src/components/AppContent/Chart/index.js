import React, { useState, useEffect } from "react";
import highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styles from "./styles.scss";
import { Loader, Icon } from "semantic-ui-react";
import chartOptions from "./options";

export { chartOptions };

export default ({ date, name, dataPromise, optionsCreatorCallback }) => {
    const [data, setData] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setFetching(true);
        setError(null);

        dataPromise()
            .then(data => {
                setData(data);
                setFetching(false);
            })
            .catch(error => {
                setFetching(false);
                setError(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [date]);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.header}>{name}</div>
            <div className={styles.chart}>
                {isFetching && <Loader active>Loading...</Loader>}
                {!isFetching && data && (
                    <HighchartsReact
                        options={optionsCreatorCallback(data)}
                        highcharts={highcharts}
                    />
                )}
                {error && !isFetching && (
                    <div className={styles.error}>
                        <div className={styles.icon}>
                            <Icon name="ban" />
                        </div>
                        Something went wrong or no data in selected segment.
                    </div>
                )}
            </div>
        </div>
    );
};
