import React from "react";

// Admin Imports

import NFTMarketplace from "views/admin/marketplace";

import DataTables from "views/admin/tables";

// Icon Imports
import { MdOutlineShoppingCart, MdBarChart, MdPerson } from "react-icons/md";

const routes = [
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
];
export default routes;
