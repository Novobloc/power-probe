/* eslint-disable */

import { HiX } from "react-icons/hi";
import SidebarCard from "layouts/sidebar/components/SidebarCard";
import { MdBarChart } from "react-icons/md";


const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="flex items-center mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
        <MdBarChart className="h-6 w-6" /> Power <span className="font-medium">PROBE</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      

      

      {/* Free Horizon Card */}
      <div className="flex justify-center">
        <SidebarCard />
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
