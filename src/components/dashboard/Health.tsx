import { MdArrowDropUp } from "react-icons/md";
import Card from "components/card";
import { getHealthStatusNode } from "api/util";
import { useState, useEffect } from "react";
import BarChart from "components/charts/BarChart";

const Health = () => {
  interface StatusData {
    timestamp: number;
    value: number;
  }

  const [data, setData] = useState({ status: "", timestamp: null });
  const [barChartDataDailyTraffic, setBarChartDataDailyTraffic] = useState<
    StatusData[]
  >([]);
  const [categoriesData, setCategoriesData] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([]);
  
  const [barChartOptions, setBarChartOptions] = useState<any>({
    chart: {
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: [],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: [
            "#8BD5E0",
            "#000000",
            "#CBD5E0",
            "#CBD5E0",
            "#CBD5E0",
            "#CBD5E0",
          ],
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "40px",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHealthStatusNode();
        setData({ status: response.status, timestamp: Date.now() });
      } catch (error) {
        console.error("Error fetching health status:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Fetch data every minute
    const intervalId = setInterval(fetchData, 10000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data.timestamp !== null) {
      if (data.status === "OK") {
        const newTimestamp = data.timestamp;
        setBarChartDataDailyTraffic(prevData => [...prevData, { timestamp: newTimestamp, value: 50 }]);
        setCategoriesData(prevCategories => [...prevCategories, new Date(newTimestamp).toISOString()]);
        setSeriesData(prevSeries => [...prevSeries, 50]);
      } else {
        const newTimestamp = data.timestamp;
        setBarChartDataDailyTraffic(prevData => [...prevData, { timestamp: newTimestamp, value: 0 }]);
        setCategoriesData(prevCategories => [...prevCategories, new Date(newTimestamp).toISOString()]);
        setSeriesData(prevSeries => [...prevSeries, 0]);
      }
    }
  }, [data]);

  useEffect(() => {
    const limitedSeriesData = seriesData.slice(-10);
  
    const limitedCategoriesData = categoriesData.slice(-10);
  
    setChartData([
      {
        name: "Snapshot Status",
        data: limitedSeriesData,
      },
    ]);
  
    setBarChartOptions((prevOptions: any) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: limitedCategoriesData,
      },
    }));
  }, [seriesData, categoriesData]);
  

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Health Status
          </p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            {data.status}{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              {data.timestamp ? ((Date.now() - data.timestamp) / 1000).toFixed(0) : ''} seconds ago
            </span>
          </p>
        </div>
        <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> 99% uptime </p>
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full pb-0 pt-10">
        {categoriesData.length > 0 && seriesData.length > 0 && (
          <BarChart chartData={chartData} chartOptions={barChartOptions} />
        )}
      </div>
    </Card>
  );
};

export default Health;
