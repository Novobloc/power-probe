import HistoryCard from "../components/dashboard/Last10Epoch";
import TopCreatorTable from "../components/dashboard/Projects";
import NftCard from "components/card/NftCard";
import Health from "../components/dashboard/Health";
import { useEffect, useState } from "react";
import { getSnapshotterStatus } from "api/util";

const Dashboard = () => {
  const dummyData = [
    {
      projectId: "projectid1",
      successfulSubmissions: 3,
      missedSubmissions: 2,
      incorrectSubmissions: 1,
    },
    {
      projectId: "projectid2",
      successfulSubmissions: 2,
      missedSubmissions: 1,
      incorrectSubmissions: 1,
    },
  ];

  const [data, setData]: any = useState();
  const [projectsData, setProjectsData]: any = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSnapshotterStatus();
      setData(response);

      const _pData =
        response.projects.length > 0 ? response?.projects : dummyData;

      const targetArray = _pData.map((item: any) => ({
        name: [
          item.projectId,
          "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80",
        ],
        totalSubmissions:
          item.successfulSubmissions +
          item.missedSubmissions +
          item.incorrectSubmissions,
      }));

      setProjectsData(targetArray);
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
            sub={data?.totalSuccessfulSubmissions || 6}
            color="bg-green-400"
          />
          <NftCard
            author="Nick Wilson"
            title="Total Incorrect Submissions"
            sub={data?.totalIncorrectSubmissions || 3}
            color="bg-red-400"
          />
          <NftCard
            author="Will Smith"
            title="Total Missed Submissions"
            sub={data?.totalMissedSubmissions || 2}
            color="bg-yellow-400"
          />
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable tableData={projectsData} />
        <div className="mb-5" />
        <HistoryCard />
      </div>
    </div>
  );
};

export default Dashboard;
