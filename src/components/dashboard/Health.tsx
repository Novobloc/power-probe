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
  const [categoriesData, setCategoriesData] = useState([]);

  const barChartOptionsDailyTraffic: any = {
    chart: {
      toolbar: {
        show: false,
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
      categories: categoriesData,
      // categories: [
      //   "00",
      //   "04",
      //   "08",
      //   "12",
      //   "14",
      //   "16",
      //   "18",
      //   "00",
      //   "04",
      //   "08",
      //   "12",
      //   "14",
      //   "16",
      //   "18",
      // ],
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHealthStatusNode();
        console.log(response, "response");
        console.log(data, "data");

        setData({ status: response.status, timestamp: Date.now() });
      } catch (error) {
        console.error("Error fetching health status:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Fetch data every minute
    const intervalId = setInterval(fetchData, 60000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(barChartDataDailyTraffic, "barChartDataDailyTraffic");
    console.log(categoriesData, "categories");

    if (data.timestamp) {
      if (data.status === "OK") {
        const newData: StatusData[] = [
          ...barChartDataDailyTraffic,
          { timestamp: data.timestamp, value: 50 },
        ];
        setBarChartDataDailyTraffic([...newData]);

        const newCategories: string[] = [
          ...categoriesData,
          new Date(data.timestamp).toLocaleTimeString(),
        ];
        setCategoriesData([...newCategories]);
      } else {
        // Push a value of 0 if status is not OK
        const newData: StatusData[] = [
          ...barChartDataDailyTraffic,
          { timestamp: data.timestamp, value: 0 },
        ];
        setBarChartDataDailyTraffic(newData);

        const newCategories: string[] = [
          ...categoriesData,
          new Date(data.timestamp).toLocaleTimeString(),
        ];
        setCategoriesData([...newCategories]);
      }
    }
  }, [data.timestamp]);

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
              {((Date.now() - data.timestamp) / 1000).toFixed(0)} seconds ago
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

      <div className="h-[300px] w-full pb-0 pt-10">
        {barChartDataDailyTraffic &&
          barChartDataDailyTraffic.length > 0 &&
          categoriesData.length > 0 && (
            <BarChart
              chartData={[
                {
                  name: "Snapshot Status",
                  data: barChartDataDailyTraffic.map(
                    (dataPoint) => dataPoint.value
                  ),
                },
              ]}
              // chartData={[
              //   {
              //     name: "Snapshot Status",
              //     data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
              //   },
              // ]}
              chartOptions={barChartOptionsDailyTraffic}
            />
          )}
      </div>
    </Card>
  );
};

export default Health;
