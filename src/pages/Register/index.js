import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Popover, Progress, Row, Select, Col } from "antd";
import styles from "./index.module.less";
import { getCaptcha } from "../../actions/register";
import { useDispatch } from "redux-react-hook";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";

const { Option } = Select;

//密码强度定义
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：弱</div>,
};
const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [popover, setPopover] = useState(false); //触发popover重绘

  const [form] = Form.useForm();
  const handleFinish = (values) => {
    console.log(values);
  };
  //自定义校验规则:检验confirm和password是否匹配
  const checkConfirm = (__, value) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("两次输入密码不匹配");
    }
    return promise.resolve();
  };
  //自定义校验规则：检验password和confirm是否匹配
  //这里visible不太理解
  const checkPassword = (__, value) => {
    const promise = Promise;
    if (!value) {
      //没有输入的时候
      setVisible(!!value); //null 空string 转换为布尔
      return promise.reject("请输入密码");
    } else if (!visible) {
      //没有visible
      setVisible(!!value);
    } else if (value && form.getFieldValue("confirm")) {
      //校验password与confirm
      form.validateFields(["confirm"]);
    }
    setPopover(!popover); // 一直改变状态使popover重绘
    return promise.resolve();
  };
  //判断密码强度
  const getPasswordStatus = (value) => {
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  //密码输入进度条设置
  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    // console.log(value);
    const passwordStatus = getPasswordStatus(value);
    return (
      value &&
      value.length && (
        <div className={styles[`progress-${passwordStatus}`]}>
          {passwordStatusMap[passwordStatus]}
          <Progress
            className={styles.progress}
            status={passwordProgressMap[passwordStatus]}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
            showInfo={false}
            format={() => passwordStatus}
          ></Progress>
        </div>
      )
    );
  };
  const handleSelect = (value) => {
    console.log(value);
  };

  const handleClickCaptcha = () => {
    // validateFields触发表单验证 返回一个promise
    form.validateFields(["username", "email", "password"]).then(() => {
      console.log(form.getFieldsValue(["username", "email", "password"]));
      dispatch(
        //异步aciton 传入三个参数作为payload
        getCaptcha(form.getFieldsValue(["username", "email", "password"]))
      );
    });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <Form form={form} onFinish={handleFinish}>
          <InputItem
            name="username"
            placeholder="请输入用户名"
            size="large"
            rules={[{ required: true, message: "请输入用户名" }]}
          />
          <InputItem
            name="email"
            placeholder="请输入邮箱"
            size="large"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请填写正确邮格式" },
            ]}
          />
          <Popover
            content={
              visible && (
                <div>
                  {/* 这里注意是调用 要加括号 */}
                  {renderPasswordProgress()}
                  <div>请至少输入6个字符。请不要使用容易被猜到的密码。</div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <InputItem
              name="password"
              placeholder="至少6位密码，区分大小写"
              type="password"
              size="large"
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            />
          </Popover>
          <InputItem
            name="confirm"
            placeholder="确认密码"
            type="password"
            size="large"
            rules={[
              { required: true, message: "请再次确认密码" },
              { validator: checkConfirm },
            ]}
          />
          <Row gutter={2}>
            <Col span={6}>
              <Select
                defaultValue="+86"
                onChange={handleSelect}
                size="large"
                style={{ width: "100%" }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
            </Col>
            <Col span={18}>
              <InputItem
                name="mobile"
                placeholder="手机号"
                type="password"
                size="large"
                rules={[
                  { required: true, message: "请输入手机号" },
                  { pattern: /^\d{11}$/, message: "手机号格式错误" },
                ]}
              />
            </Col>
          </Row>
          <InputItem
            name="captcha"
            placeholder="验证码"
            size="large"
            rules={[{ required: true, message: "请输入验证码" }]}
            onClick={handleClickCaptcha}
          />
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <SubmitButton>注册</SubmitButton>
            </Col>
            <Col>
              <Link to="/login">使用已有账户登录</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default Register;
