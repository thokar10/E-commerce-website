"use client";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderPage from "../Component/HeaderPage";

const Page = () => {
  const navigate = useRouter();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        values
      );

      await localStorage.setItem(
        "userAccessToken",
        response.data.userAccessToken
      );
      message.success("login successful");
      setTimeout(() => {
        navigate.push("/");
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data);
      if (!error.response.data.errorMessage) {
        alert(error);
      } else {
        message.error(error.response.data.errorMessage);
      }
    }
  };
  return (
    <>
      <HeaderPage />

      <div className="   flex  justify-center ">
        <div className=" w-[60%] h-[30rem] flex flex-col bg-white box-shadow ">
          <div className=" flex justify-between items-center p-8">
            <p className="text-[25px] font-semibold text-gray-500">
              {" "}
              Welcome to Sporty, please login !
            </p>
            <p className="text-[15px] ">
              New member,{" "}
              <span className="text-red-400 hover:cursor-pointer">
                Register
              </span>{" "}
              here
            </p>
          </div>

          <div className="  p-5 flex gap-2 justify-center  ">
            <div className="w-[40%]  flex flex-col  p-5  ">
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                style={{ maxWidth: 600, color: "white" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="userEmail"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="userPassword"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className=" flex justify-center w-[100%]">
                  <Button
                    htmlType="submit"
                    type="primary"
                    className=" text-white w-[50%] "
                  >
                    LOGIN
                  </Button>
                </div>
              </Form>
              <div className="flex justify-end pt-2">
                <p className="text-[13px] hover:cursor-pointer hover:text-red-500 text-gray-500">
                  reset your password
                </p>
              </div>
            </div>
            <div className="w-[20%] "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
