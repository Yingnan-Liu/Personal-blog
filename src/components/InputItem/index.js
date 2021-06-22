import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col, message } from "antd";
import styles from "./index.module.less";

const InputItem = (props) => {
  const { name, rules, ...rest } = props;

  // 点击后倒计时效果
  const [timing, setTiming] = useState(false); //是否在倒计时
  //倒计时秒数
  const [count, setCount] = useState(30);

  const handleClickCaptcha = () => {
    message.success("验证码为1234");
    //开始计时标志
    setTiming(true);
  };

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
      <Form.Item name={name} rules={rules}>
        <Row gutter="8">
          <Col span={16}>
            <Input {...rest} />
          </Col>
          <Col span="8">
            <Button
              className={styles.getCaptcha}
              size="large"
              onClick={handleClickCaptcha}
              //点击后禁用按钮
              disabled={timing}
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
    <Form.Item name={name} rules={rules}>
      <Input {...rest} />
    </Form.Item>
  );
};

export default InputItem;
