"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Languages,
  MapPin,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  selectUser,
  selectUserStatus,
} from "@/redux/slices/user.slice";
import { AppDispatch } from "@/redux/store";

const Navbar: React.FC = () => {
  const LanguageIcon = React.memo(() => <Languages color="black" width={20} />);
  LanguageIcon.displayName = "LanguageIcon";
  const SearchIcon = React.memo(() => <Search color="black" width={20} />);
  SearchIcon.displayName = "SearchIcon";
  const LocationIcon = React.memo(() => <MapPin width={20} />);
  LocationIcon.displayName = "LocationIcon";
  const OrdersIcon = React.memo(() => (
    <ShoppingBag width={25} className="mt-1" />
  ));
  OrdersIcon.displayName = "OrdersIcon";
  const CartIcon = React.memo(() => (
    <ShoppingCart width={25} className="mt-1" />
  ));
  CartIcon.displayName = "CartIcon";

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);

  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser("66eaffe53bf342426229cf29"));
    }
  }, [userStatus, dispatch]);

  const userId = user?._id || "guest";
  const userName = user?.name || "Guest";
  const userLocation = user?.location || "Unknown";

  return (
    <div className="bg-midnight p-4 flex justify-between fixed w-full z-50">
      <div className="py-3">
        <h1 className="text-lightGray text-2xl font-bold opacity-90">
          <Link href="/">SMART DEPOT</Link>
        </h1>
      </div>
      <div className="py-2">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="bg-transparent hover:bg-transparent border border-transparent">
            <SelectValue>
              <div className="flex gap-1 text-lightGray">
                <h1 className="text-md font-bold opacity-90">
                  {selectedLanguage}
                </h1>
                <LanguageIcon />
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EN">English</SelectItem>
            <SelectItem value="ML">Malayalam</SelectItem>
            <SelectItem value="TA">Tamil</SelectItem>
            <SelectItem value="KN">Kannada</SelectItem>
            <SelectItem value="HI">Hindi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex py-2">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[75px] bg-lightGray hover:bg-gray-300">
            <SelectValue>{selectedCategory}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Smartphones">Smartphones</SelectItem>
            <SelectItem value="Spare Parts">Spare Parts</SelectItem>
            <SelectItem value="Hardware Tools">Hardware Tools</SelectItem>
            <SelectItem value="Software Tools">Software Tools</SelectItem>
            <SelectItem value="Equipments">Equipments</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search..." />
        <Button className="bg-lightGray hover:bg-gray-300">
          <SearchIcon />
        </Button>
      </div>
      <Link
        href={`/account/login-security/${userId}`}
        className="p-1 grid border border-gray-900 rounded-lg hover:border-white"
      >
        <div className="flex gap-1">
          <p className="text-lightGray font-thin text-xs mt-1">Hello,</p>
          <User width={20} />
        </div>
        <h1 className="text-lightGray font-semibold text-md">{userName}</h1>
      </Link>
      <Link
        href={`/account/addresses/${userId}`}
        className="p-1 grid border border-gray-900 rounded-lg hover:border-white hover:cursor-pointer"
      >
        <div className="flex gap-1">
          <p className="text-lightGray font-thin text-xs mt-1">
            Deliver to {userName}
          </p>
          <LocationIcon />
        </div>
        <h1 className="text-lightGray font-semibold text-sm mt-1">
          {userLocation}
        </h1>
      </Link>
      <Link
        href={`/account/orders/${userId}`}
        className="p-1 grid border border-gray-900 rounded-lg hover:border-white"
      >
        <p className="text-lightGray font-light text-xs mt-1">Returns &</p>
        <div className="flex gap-1">
          <h1 className="text-lightGray font-semibold text-sm mt-2">Orders</h1>
          <OrdersIcon />
        </div>
      </Link>
      <Link
        href={`/cart/${userId}`}
        className="p-1 grid border border-gray-900 rounded-lg hover:border-white"
      >
        <p className="text-lightGray font-thin text-xs mt-1">Your</p>
        <div className="flex gap-1">
          <h1 className="text-lightGray font-semibold text-sm mt-1">Cart</h1>
          <CartIcon />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
