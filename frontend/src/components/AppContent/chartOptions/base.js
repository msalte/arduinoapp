export default (yAxisTitle, tooltipSuffix) => {
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
