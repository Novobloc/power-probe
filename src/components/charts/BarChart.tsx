import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

type ChartProps = {
  chartData: any[];
  chartOptions: any;
};

const ColumnChart: React.FC<ChartProps> = (props) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    console.log(props.chartData, "chartData satya");
    console.log(props.chartOptions, "chartOptions satya satya");
    setChartData(props.chartData);
    setChartOptions(props.chartOptions);
  }, [props.chartData, props.chartOptions]);

  return (
    <div id="chart">
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        width="100%"
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
