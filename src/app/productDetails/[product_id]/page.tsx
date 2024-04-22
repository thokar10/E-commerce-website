import AddToCart from "@/app/Component/CartButton";
import axios from "axios";

const page = async ({ params }: any) => {
  const { product_id } = params;

  const response = await axios.get(
    `http://localhost:8000/products/productDetails/661535403b45824fa3218ddb`
  );
  console.log(response.data);
  const productDetails = response.data.productDetails;
  console.log(productDetails);

  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-gray-600 flex justify-center items-center">
        <div className=" bg-white w-[70%] h-[80%] flex  py-8 p-4 ">
          <div
            className="productImage w-[60%] "
            style={{ backgroundImage: `url(${productDetails.ProductImage})` }}
          ></div>

          <div className=" flex flex-col gap-10  w-[40%] p-6 ">
            {" "}
            <div className="box-shadow p-3 flex flex-col gap-2 items-center">
              <p className="text-3xl">{productDetails.ProductName}</p>

              <p className=" text-red-600  text-4xl">
                {" "}
                Rs.&nbsp;{productDetails.ProductPrice}
              </p>
            </div>
            <div>
              <AddToCart
                product_id={product_id}
                ProductPrice={productDetails.ProductPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
