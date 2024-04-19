import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators";
import HistoryCard from "./components/Last10Epoch";
import TopCreatorTable from "./components/Projects";
import NftCard from "components/card/NftCard";
import Health from "../default/components/Health";

const Marketplace = () => {
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
            sub={10}
            image={NFt3}
            color="bg-green-400"
          />
          <NftCard
            author="Nick Wilson"
            title="Total Incorrect Submissions"
            image={NFt2}
            sub={1}
            color="bg-red-400"
            

          />
          <NftCard
            author="Will Smith"
            title="Total Missed Submissions"
            image={NFt4}
            sub={9}
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

export default Marketplace;
