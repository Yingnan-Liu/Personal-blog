import React from "react";
import InputItem from "../../components/InputItem";
import { Form } from "antd";
import styles from "./index.module.less";
const Register = () => {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.login}>
        <Form form={form} onFinish={handleFinish}>
          <InputItem
            name="mail"
            placeholder="邮箱"
            size="large"
            rules={[
              { required: true, message: "请输入用户名" },
              { type: "email", message: "请填写正确邮格式" },
            ]}
          />
        </Form>
      </div>
    </div>
  );
};
export default Register;
