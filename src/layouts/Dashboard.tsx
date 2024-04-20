import tableDataTopCreators from "components/dashboard/tableDataTopCreators";
import HistoryCard from "../components/dashboard/Last10Epoch";
import TopCreatorTable from "../components/dashboard/Projects";
import NftCard from "components/card/NftCard";
import Health from "../components/dashboard/Health";
import { useEffect, useState } from "react";
import { getSnapshotterStatus } from "api/util";

const Dashboard = () => {
  const [data, setData]: any = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSnapshotterStatus();
      setData(response);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        {/* <Banner /> */}
        <Health />

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Snapshotter Status
          </h4>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            author="Esthera Jackson"
            title="Total Successful Submissions"
            sub={data?.totalSuccessfulSubmissions}
            color="bg-green-400"
          />
          <NftCard
            author="Nick Wilson"
            title="Total Incorrect Submissions"
            sub={data?.totalIncorrectSubmissions}
            color="bg-red-400"
          />
          <NftCard
            author="Will Smith"
            title="Total Missed Submissions"
            sub={data?.totalMissedSubmissions}
            color="bg-yellow-400"
          />
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable tableData={tableDataTopCreators} />
        <div className="mb-5" />
        <HistoryCard />
      </div>
    </div>
  );
};

export default Dashboard;
