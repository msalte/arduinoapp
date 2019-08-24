import moment from "moment";
import baseOptions from "./base";

export default (data, yAxisTitle, tooltipSuffix) => {
    const grouped = data.reduce((accumulator, curr) => {
        const displayName = curr.displayName;

        if (!accumulator[displayName]) {
            accumulator[displayName] = [];
        }

        accumulator[displayName].push({
            timestamp: curr.timestamp,
            value: curr.value,
        });

        return accumulator;
    }, {});

    const series = [];
    var categories = [];

    Object.keys(grouped).forEach(key => {
        if (categories.length === 0) {
            categories = grouped[key].map(i => moment(i.timestamp).format("DD-MM-YYYY HH:mm:ss"));
        }

        series.push({
            name: key,
            yAxis: 0,
            data: grouped[key].map(i => i.value),
        });
    });

    const base = baseOptions(yAxisTitle, tooltipSuffix);

    const options = Object.assign({}, base, {
        xAxis: {
            ...base.xAxis,
            categories,
        },
        series,
    });

    return options;
};
