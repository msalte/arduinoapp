import moment from "moment";

const getBaseOptions = (yAxisTitle, tooltipSuffix) => {
    const options = {
        credits: {
            enabled: false,
        },
        title: { text: "" },
        chart: {
            type: "spline",
            zoomType: "xy",
            backgroundColor: "#fff",
        },
        xAxis: {
            title: { text: "" },
            categories: [],
            lineColor: "#e6e6e6",
            min: 0,
            max: 5,
            scrollbar: {
                enabled: true,
                barBackgroundColor: "#ccc",
                barBorderColor: "#ccc",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#ccc",
                buttonArrowColor: "#333",
            },
            tickLength: 0,
            labels: {
                style: {
                    color: "#000",
                },
            },
        },
        legend: {
            itemHiddenStyle: { color: "#ccc" },
            itemHoverStyle: { color: "#000" },
            itemStyle: {
                color: "#000",
            },
        },
        yAxis: {
            title: {
                text: yAxisTitle,
                style: { color: "#000" },
            },
            labels: {
                style: {
                    color: "#000",
                },
            },
            gridLineColor: "#e6e6e6",
        },
        tooltip: { shared: true, valueSuffix: tooltipSuffix },
        series: [],
    };

    return options;
};

export default (data, yAxisTitle, tooltipSuffix) => {
    const baseOptions = getBaseOptions(yAxisTitle, tooltipSuffix);

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

    const options = Object.assign({}, baseOptions, {
        xAxis: {
            ...baseOptions.xAxis,
            categories,
        },
        series,
    });

    return options;
};
