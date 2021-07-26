import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col } from "antd";
import styles from "./index.module.less";

const InputItem = (props) => {
  const { name, rules, label, onClick, ...rest } = props;

  // 点击后倒计时效果
  const [timing, setTiming] = useState(false); //是否在倒计时
  //倒计时秒数
  const [count, setCount] = useState(30);

  // 获取验证码按钮点击事件 在register组件中实现

  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = setInterval(() => {
        setCount((preSec) => {
          if (preSec <= 1) {
            setTiming(false);
            clearInterval(interval);
            return 30;
          }
          //return覆盖count
          return preSec - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timing]);

  if (name === "captcha") {
    return (
      <Form.Item name={name} rules={rules} label={label}>
        <Row gutter="8">
          <Col span={16}>
            <Input {...rest} />
          </Col>
          <Col span="8">
            <Button
              className={styles.getCaptcha}
              size="large"
              //点击后禁用按钮
              disabled={timing}
              onClick={onClick}
            >
              <span style={{ fontSize: "15px", color: "grey" }}>
                {timing ? `${count}秒` : "获取验证码"}
              </span>
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }

  return (
    // Form.item可以有间距样式 包裹一下
    <Form.Item name={name} rules={rules} label={label}>
      <Input {...rest} autoComplete="off" />
    </Form.Item>
  );
};

export default InputItem;
