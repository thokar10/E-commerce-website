"use client";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { IProduct } from "../utils/interface";
import axios from "axios";
import { headers } from "next/headers";

const AddToCart = ({ product_id, ProductPrice }: IProduct) => {
  console.log(product_id);
  const navigate = useRouter();
  const [quantityValue, setQuantityValue] = useState(0);

  const goto = async () => {
    try {
      const userToken = await localStorage.getItem("userAccessToken");
      const bodyObject = await {
        Quantity: quantityValue,
        ProductPrice: ProductPrice,
      };

      console.log(bodyObject);

      await axios.post(
        `http://localhost:8000/carts/create?product_id=${product_id}`,
        bodyObject,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      message.success("added successfully to cart");
      setTimeout(() => {
        navigate.push("/cartDetails");
      }, 3000);
    } catch (error: any) {
      if (error.response.data.errorMessage) {
        message.error(error.response.data.errorMessage);
      }
      message.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex  gap-10">
          <div>
            {" "}
            <p className="text-gray-500">Quantity</p>
          </div>
          <div className="flex items-center justify-center  gap-4">
            {" "}
            <Button
              onClick={() => {
                if (quantityValue <= 0) {
                  return;
                }
                setQuantityValue(quantityValue - 1);
              }}
            >
              -
            </Button>
            <p className="text-gray-500">{quantityValue}</p>
            <Button
              onClick={() => {
                if (quantityValue > 4) {
                  return;
                }
                setQuantityValue(quantityValue + 1);
              }}
            >
              +
            </Button>
          </div>
        </div>

        <Button className="w-[100%]  rounded-none bg-yellow-300" onClick={goto}>
          Add to Cart
        </Button>
      </div>
    </>
  );
};
export default AddToCart;
