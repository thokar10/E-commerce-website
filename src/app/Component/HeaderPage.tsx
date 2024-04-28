"use client";
import { DownOutlined } from "@ant-design/icons";
import { Button, MenuProps, Popover } from "antd";
import { Dropdown, Input, Space } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resolve } from "path";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import { MdPersonOutline } from "react-icons/md";

const HeaderPage = ({ searchedValue }: any) => {
  interface IUser {
    userName: string;
    userEmail: string;
    location: string;
    phoneNo: number;
  }

  const [showLogin, setShowLogin] = useState(true);
  const [userFirstCharacter, setUserFirstCharacter] = useState("");
  const [userDetails, setUserDetails] = useState<IUser>({
    userName: "",
    userEmail: "",
    location: "",
    phoneNo: 0,
  });

  const [searchValue, setSearchValue] = useState("");

  const navigate = useRouter();
  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const searchItem = async (e: any) => {
    e.preventDefault();

    if (!searchValue) {
      return;
    }
    navigate.push(`/searchProduct/${searchValue}`);
  };

  const getUserDetails = async (userToken: string) => {
    try {
      const response = await axios.get("http://localhost:8000/users/profile", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUserDetails(response.data.userDetails);

      setUserFirstCharacter(
        response.data.userDetails.userName[0].toUpperCase()
      );
    } catch (error) {}
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userAccessToken");
    if (userToken) {
      getUserDetails(userToken);
      setShowLogin(false);
    }
    if (!userToken) {
      setShowLogin(true);
    }

    setSearchValue(searchedValue);
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href={{
            pathname: "/categories",
            query: {
              category: "jersey",
            },
          }}
        >
          <div className="w-[10rem] p-2" style={{ marginRight: "10px" }}>
            <p className="text-center text-sm font-semibold text-gray-500">
              Football T-shirt
            </p>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href={{
            pathname: "/categories",
            query: {
              category: "futsal shoes",
            },
          }}
        >
          <div className="w-[10rem] p-2">
            <p className="text-center text-sm font-semibold text-gray-500">
              Futsal Shoes
            </p>
          </div>
        </Link>
      ),
    },
  ];

  //popover

  const text = (
    <div className="bg-[whitesmoke] box-shadow text-gray-500 flex justify-center gap-1 flex-col text-center p-1">
      <p>{userDetails.userName}</p>
      <p>{userDetails.userEmail}</p>
    </div>
  );

  const content = (
    <div className="flex justify-center mt-5">
      <Button
        className="w-[80%] border-1 border-red-400 text-red-600"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
          navigate.push("/");
        }}
      >
        Sign Out
      </Button>
    </div>
  );

  return (
    <>
      {showLogin ? (
        <>
          <div className="bg-gray-600 flex p-6 text-white items-center justify-center gap-7">
            <div className="flex gap-2 items-center">
              <div className=" logo h-[50px] w-[50px] "></div>
              <p
                className="website-name
                font-bold text-2xl hover:cursor-pointer"
                onClick={() => {
                  navigate.push("/");
                }}
              >
                Sporty
              </p>
              <div>
                <Dropdown menu={{ items }} className="w-[100px] p-5">
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <p className="font-bold text-sm font-serif">Categories</p>
                      <DownOutlined className="text-sm font-semibold" />
                    </Space>
                  </a>
                </Dropdown>{" "}
              </div>
            </div>

            <div className="relative w-[40%]">
              <form onSubmit={searchItem}>
                <Input
                  className="w-[100%] p-2 text-gray-500"
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </form>

              <div
                className="absolute top-1 right-5  hover:cursor-pointer bg-slate-400  w-[40px] h-7 flex justify-center items-center rounded-md"
                onClick={searchItem}
              >
                <FaSearch className="text-white" />{" "}
              </div>
            </div>
            <div
              className="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-800 p-2 rounded-md"
              onClick={() => {
                navigate.push("/login");
              }}
            >
              <span>
                <MdPersonOutline />
              </span>
              <p>login</p>
            </div>
            <LiaGripLinesVerticalSolid />
            <div
              className="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-800 p-2  "
              onClick={() => {
                navigate.push("/signUp");
              }}
            >
              <p>Sign Up</p>
            </div>
            <div
              className="hover:cursor-pointer p-2 hover:bg-gray-800 rounded-md"
              onClick={() => {
                navigate.push("/cartDetails");
              }}
            >
              <FiShoppingCart className="text-4xl  " />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-600 flex p-6 text-white items-center justify-center gap-7">
            <div className="flex gap-10 items-center">
              <div className="flex gap-2 items-center">
                {" "}
                <div className=" logo h-[50px] w-[50px] "></div>
                <p
                  className="website-name font-bold text-2xl hover:cursor-pointer"
                  onClick={() => {
                    navigate.push("/");
                  }}
                >
                  Sporty
                </p>
              </div>

              <div>
                <Dropdown menu={{ items }} className="w-[100px] p-5">
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <p className="font-bold text-sm">Categories</p>
                      <DownOutlined className="text-sm font-semibold" />
                    </Space>
                  </a>
                </Dropdown>{" "}
              </div>
            </div>

            <div className="relative w-[40%]">
              <form onSubmit={searchItem}>
                <Input
                  className="w-[100%] p-2 text-gray-500 "
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </form>

              <div
                className="absolute top-1 right-5  hover:cursor-pointer bg-slate-400  w-[40px] h-7 flex justify-center items-center rounded-md"
                onClick={searchItem}
              >
                <FaSearch className="text-white" />{" "}
              </div>
            </div>
            <Popover placement="bottom" title={text} content={content}>
              <div className=" h-[30px] w-[30px] flex  justify-center bg-[whitesmoke] rounded-[50%] text-black font-semibold hover:cursor-pointer ">
                <p> {userFirstCharacter}</p>
              </div>
            </Popover>

            <LiaGripLinesVerticalSolid />

            <div
              className="hover:cursor-pointer p-2 hover:bg-gray-800 rounded-md"
              onClick={() => {
                navigate.push("/cartDetails");
              }}
            >
              <FiShoppingCart className="text-4xl  " />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default HeaderPage;
