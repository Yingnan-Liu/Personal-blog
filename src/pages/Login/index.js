import React, { useState } from "react";
import { Tabs, Form, Row, Checkbox } from "antd";
import {
  SmileOutlined,
  LockOutlined,
  MobileOutlined,
  MessageOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const Login = () => {
  //react useForm钩子
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    console.log(values);
  };
  const [autoLogin, setAutoLogin] = useState(false);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Form form={form} onFinish={handleFinish}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="账号密码登录" key="1">
              <InputItem
                name="username"
                prefix={
                  <SmileOutlined
                    style={{
                      fontSize: 16,
                      color: "#1890ff",
                    }}
                  />
                }
                placeholder="用户名"
                size="large"
                rules={[{ required: true, message: "请输入用户名" }]}
              />
              <InputItem
                name="password"
                prefix={
                  <LockOutlined
                    style={{
                      fontSize: 16,
                      color: "#1890ff",
                    }}
                  />
                }
                placeholder="密码"
                size="large"
                type="password"
                rules={[{ required: true, message: "请输入密码" }]}
              />
            </TabPane>
            <TabPane tab="手机号登录" key="2">
              <InputItem
                name="phoneNumber"
                prefix={
                  <MobileOutlined
                    style={{
                      fontSize: 16,
                      color: "#1890ff",
                    }}
                  />
                }
                placeholder="手机号"
                size="large"
                rules={[{ required: true, message: "请输入手机号" }]}
              />
              <InputItem
                name="captcha"
                prefix={
                  <MessageOutlined
                    style={{
                      fontSize: 16,
                      color: "#1890ff",
                    }}
                  />
                }
                placeholder="验证码"
                size="large"
                rules={[{ required: true, message: "请输入验证码" }]}
              />
            </TabPane>
          </Tabs>
          <Row justify="space-between">
            <Checkbox
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
            >
              自动登录
            </Checkbox>
            <a href="#!">忘记密码</a>
          </Row>
          <SubmitButton>登录</SubmitButton>
        </Form>

        <Row className={styles.others} justify="space-between">
          <div>
            其他登陆方式
            <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
            <WeiboCircleOutlined className={styles.icon} />
          </div>
          <Link className={styles.register} to="/register">
            注册用户
          </Link>
        </Row>
      </div>
    </div>
  );
};
export default Login;
