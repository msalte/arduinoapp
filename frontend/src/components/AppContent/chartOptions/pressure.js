import moment from "moment";
import baseOptions from "./base";

export default data => {
    const { entries } = data;

    const categories = entries.map(d => moment(d.timestamp).format("HH:mm:ss"));

    const dieselData = entries.map(d => d.diesel);
    const exhaustData = entries.map(d => d.exhaust);
    const oilData = entries.map(d => d.oil);
    const turbo1Data = entries.map(d => d.turbo1);
    const turbo2Data = entries.map(d => d.turbo2);
    const waterInjectData = entries.map(d => d.waterInject);

    const averageData = entries.map(d => parseFloat(Number(d.average).toFixed(2)));

    const base = baseOptions("Pressure (bar)", "bar");

    const options = Object.assign({}, base, {
        xAxis: {
            ...base.xAxis,
            categories,
        },
        series: [
            {
                name: "Diesel",
                yAxis: 0,
                data: dieselData,
            },
            {
                name: "Exhaust",
                yAxis: 0,
                data: exhaustData,
            },
            {
                name: "Oil",
                yAxis: 0,
                data: oilData,
            },
            {
                name: "Turbo 1",
                yAxis: 0,
                data: turbo1Data,
            },
            {
                name: "Turbo 2",
                yAxis: 0,
                data: turbo2Data,
            },
            {
                name: "Water Inject",
                yAxis: 0,
                data: waterInjectData,
            },
            {
                name: "Average",
                yAxis: 0,
                data: averageData,
            },
        ],
    });

    return options;
};
