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
  const [quantityValue, setQuantityValue] = useState(1);

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
            <p>Quantity</p>
          </div>
          <div className="flex items-center justify-center  gap-4">
            {" "}
            <Button
              onClick={() => {
                if (quantityValue <= 1) {
                  return;
                }
                setQuantityValue(quantityValue - 1);
              }}
            >
              -
            </Button>
            <p>{quantityValue}</p>
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
        <div className="flex  gap-4">
          <Button type="primary" className="w-[50%] rounded-none">
            Buy Now
          </Button>
          <Button
            type="primary"
            className="w-[50%] rounded-none"
            onClick={goto}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
};
export default AddToCart;
