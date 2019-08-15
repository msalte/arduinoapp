import moment from "moment";
import baseOptions from "./base";

export default data => {
    const { entries } = data;

    const categories = entries.map(d => moment(d.timestamp).format("HH:mm:ss"));

    const tempBeforeIntData = entries.map(d => d.temperatureBeforeIntercooler);
    const tempAfterIntData = entries.map(d => d.temperatureAfterIntercooler);

    const averageData = entries.map(d => parseFloat(Number(d.average).toFixed(2)));

    const base = baseOptions("Temperature (°C)", "°C");

    const opts = Object.assign({}, base, {
        xAxis: {
            ...base.xAxis,
            categories,
        },
        series: [
            {
                name: "Before Intercooler",
                yAxis: 0,
                data: tempBeforeIntData,
            },
            {
                name: "After Intercooler",
                yAxis: 0,
                data: tempAfterIntData,
            },
            {
                name: "Average",
                yAxis: 0,
                data: averageData,
            },
        ],
    });

    return opts;
};
