"use client";
import { Button, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IProductDetails } from "../utils/interface";
import Image from "next/image";

const Page = () => {
  const [AllCartItems, setAllCartItems] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [Quantity, setQuantity] = useState(0);

  const getCartItems = async () => {
    try {
      const userToken = localStorage.getItem("userAccessToken");
      const response = await axios.get(
        "http://localhost:8000/carts/getAllProducts",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setAllCartItems(response.data.ProductDetails);
      setCartTotalPrice(response.data.TotalAmountOfCart);
      setNumberOfProduct(response.data.ProductsNumber);
    } catch (error: any) {
      if (error.response.data.errorMessage) {
        message.error(error.response.data.errorMessage);
      }
      message.error(error);
    }
  };
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <div className="flex w-[100vw] h-[100vh] justify-center pt-10 bg-[whitesmoke]">
        <div className="w-[75%] flex border-2 border-black gap-5">
          <div className="w-[75%] bg-white box-shadow">
            <div className="flex flex-col gap-7 justify-between p-10">
              {AllCartItems.map((items: IProductDetails) => {
                return (
                  <>
                    <div className="flex justify-between">
                      <div className="flex gap-7   items-center ">
                        <div>
                          {" "}
                          <img
                            src={items.productId.ProductImage}
                            className="w-auto h-[100px]"
                            alt="s"
                          />
                        </div>
                        <p>{items.productId.ProductName}</p>
                        <p className="text-red-600 text-xl">
                          Rs. {items.productId.ProductPrice}
                        </p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Button onClick={() => {}}>-</Button>
                        <p>{items.Quantity}</p>
                        <Button>+</Button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="w-[35%] h-[max-content] flex flex-grow flex-col gap-2 box-shadow p-5 bg-white ">
            <p className="text-center font-semibold ">Order Summary</p>
            <div className="flex justify-between">
              <p>Total Amount:</p>

              <p className="font-semibold text-red-600">Rs. {cartTotalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Number:</p>

              <p className="font-semibold text-red-600">{numberOfProduct}</p>
            </div>
            <div className="flex justify-between">
              <p>shipping price</p>
              <p className="font-semibold text-red-600">Rs .200</p>
            </div>

            <Button type="primary" className="w-[100%]">
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
