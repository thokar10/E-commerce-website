"use client";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <div className="all w-[100vw] h-[100vh] flex justify-center items-center ">
        <div className=" w-[40%] h-[50%]  rounded-lg  flex justify-center items-center ">
          <div className="bg-[whitesmoke] h-[90%] flex justify-center p-9 items-center">
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
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

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
