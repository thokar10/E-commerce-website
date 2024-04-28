"use client";
import { Button, Form, Input, InputNumber, message } from "antd";
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
        "http://localhost:8000/users/Register",
        values
      );

      await localStorage.setItem(
        "userAccessToken",
        response.data.userAccessToken
      );
      message.success("registered successful");
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
        <div className=" w-[60%] h-max flex flex-col bg-white box-shadow ">
          <div className=" flex justify-between items-center p-8">
            <p className="text-[25px] font-semibold text-gray-500">
              {" "}
              Welcome to Sporty, please sign up !
            </p>
          </div>

          <div className=" flex flex-col items-center   p-8">
            <div className=" flex w-[50%]   ">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ color: "blue" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className="w-[100%]"
              >
                <Form.Item
                  label="user name"
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
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
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="confirm password"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="location"
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your location!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="phone number"
                  name="phoneNo"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "17.6rem" }} />
                </Form.Item>
                {/* </div>
              </div> */}
                <div className=" flex justify-center ">
                  <Button
                    htmlType="submit"
                    type="primary"
                    className=" text-white w-[100%] "
                  >
                    LOGIN
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
