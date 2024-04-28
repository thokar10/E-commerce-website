"use client";
import { Button, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const MoreRandomPage = ({ homeProductDetails }: any) => {
  console.log(homeProductDetails);
  const [previousData, setPreviousData]: any = useState([]);
  const [productDetails, setProductDetails]: any = useState([]);
  const [firstLoadMoreHide, setFirstLoadMoreHide] = useState(false);
  const [secondLoadMoreHide, setSecondLoadMoreHide] = useState(true);

  const getMoreRandomProduct = async () => {
    setFirstLoadMoreHide(true);
    setSecondLoadMoreHide(false);
    try {
      // setPreviousData(homeProductDetails);
      const response = await axios.get(
        "http://localhost:8000/products/randomProducts"
      );

      const mergedArray = [...previousData, ...response.data.productDetails];
      setProductDetails(mergedArray);
      setPreviousData(mergedArray);
    } catch (error: any) {
      if (error.response.data.errorMessage) {
        message.error(error.response.data.errorMessage);
      }
      message.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {firstLoadMoreHide === false && (
        <>
          <div className="flex  justify-center">
            <Button type="primary" onClick={getMoreRandomProduct}>
              Load More
            </Button>
          </div>
        </>
      )}
      <div className="flex flex-col items-center  gap-5 w-[100%] ">
        <div className="w-[100%] h-max">
          <div className="gridContainer grid gap-5">
            {productDetails.map((element: any) => (
              <>
                <div className="product-container flex flex-col items-center  gap-5  rounded-sm p-5 bg-white box-shadow ">
                  <div className="flex flex-col items-center flex-wrap gap-5">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        style={{
                          backgroundImage: `url(${element.ProductImage})`,
                        }}
                        className="productImage h-[100px] w-[100px]"
                      ></div>{" "}
                      <p>{element.ProductName}</p>
                      <p className="text-red-400">Rs.{element.ProductPrice}</p>
                    </div>
                    <Link href={`/productDetails/${element._id}`}>
                      <Button>Details</Button>
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div>
          {secondLoadMoreHide === false && (
            <>
              <Button type="primary" onClick={getMoreRandomProduct}>
                Load More
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default MoreRandomPage;
