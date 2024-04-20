import React from "react";
import Card from "components/card";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type RowObj = {
  name: string[];
  totalSubmissions: number;
};

function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  console.log(tableData, "tableData");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center gap-2">
          <div className="h-[30px] w-[30px] rounded-full">
            <img
              src={info.getValue()[1]}
              className="h-full w-full rounded-full"
              alt=""
            />
          </div>
          <p className="text-sm font-medium text-navy-700 dark:text-white">
            {info.join("\n")}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("totalSubmissions", {
      id: "totalSubmissions",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SUBMISSIONS
        </p>
      ),
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Projects
        </div>
      </header>

      {tableData.map((data: any, index: any) => (
        <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {" "}
                {data.name[0]}
              </h5>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
            <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
              <p> {} </p>
              {data.totalSubmissions} submissions<p className="ml-1"></p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper<RowObj>();
