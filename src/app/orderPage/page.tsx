"use client";
import { useEffect, useState } from "react";
import HeaderPage from "../Component/HeaderPage";
import axios from "axios";

const Page = () => {
  const [orderDetails, setOrderDetails]: any = useState({});
  const getOrderDetails = async () => {
    const userToken = localStorage.getItem("userAccessToken");

    try {
      const response: any = await axios.get(
        "http://localhost:8000/carts/getOrderDetails",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setOrderDetails(response.data.OrderDetails);
      console.log(response.data.OrderDetails);
    } catch (e) {}
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <HeaderPage />
      <div className=" flex flex-col gap-2 items-center text-gray-500 p-5">
        <p className="font-mono font-bold text-2xl p-2 rounded-sm  bg-[whitesmoke] box-shadow text-gray-500 ">
          Order List
        </p>
        <div className="flex gap-5 justify-center  w-[50%]  p-5 box-shadow">
          <div className="flex flex-col gap-3 items-center ">
            <div>
              <img
                src={orderDetails.productId?.ProductImage}
                className="w-[100px] h-[100px]"
              />
            </div>
            <div>{orderDetails.productId?.ProductName}</div>
            <div className="text-red-500 font-semibold">
              Rs. <span>{orderDetails.productId?.ProductPrice}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-5">
              <p>Quantity:</p>
              <p>{orderDetails?.Quantity}</p>
            </div>
            <div className="flex gap-5 text-red-500 font-mono font-bold">
              <p>Total Amount:</p>
              <p>Rs. {orderDetails?.totalPrice}</p>
            </div>
          </div>
          <div className="font-mono flex  gap-5   p-2 rounded-sm  text-gray-400 ">
            <p className="underline text-md">Order Status:</p>
            <p className="  font-extrabold text-red-300">
              {orderDetails.orderStatus}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
