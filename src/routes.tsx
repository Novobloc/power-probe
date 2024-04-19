import React from "react";
import NFTMarketplace from "layouts/Dashboard";

// Icon Imports
import { MdOutlineShoppingCart } from "react-icons/md";

const routes = [
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
];
export default routes;
