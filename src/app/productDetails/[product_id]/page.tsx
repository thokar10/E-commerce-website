import AddToCart from "@/app/Component/CartButton";
import HeaderPage from "@/app/Component/HeaderPage";
import axios from "axios";

const page = async ({ params }: any) => {
  const { product_id } = params;

  const response = await axios.get(
    `http://localhost:8000/products/productDetails/${product_id}`
  );
  console.log(response.data);
  const productDetails = response.data.productDetails;
  console.log(productDetails);

  return (
    <>
      <HeaderPage />
      <div className="flex justify-center  ">
        {/* Adding overflow-hidden class to hide overflow */}
        <div className="  w-[100%] h-max flex gap-7 p-20  ">
          <div
            className="productImage w-[60%] "
            style={{ backgroundImage: `url(${productDetails.ProductImage})` }}
          ></div>

          <div className=" flex flex-col gap-10 bg-[whitesmoke]  box-shadow  w-[30%] p-6 ">
            {" "}
            <div className="box-shadow p-3 flex flex-col gap-2 items-center bg-white">
              <p className="text-xl text-gray-500">
                {productDetails.ProductName}
              </p>

              <p className=" text-red-400  text-2xl">
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
