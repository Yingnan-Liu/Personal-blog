import React, { useState } from "react";
import { Tag, Input } from "antd";
import styles from "./index.module.less";
import { PlusOutlined } from "@ant-design/icons";

const TagList = (props) => {
  const { tags } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  //初始值传入给定值
  const [Tags, setTags] = useState(tags);
  //点击加号改变标识符 使input显示
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    // console.log(inputValue);
    //更新inputValue
    setInputValue(e.target.value);
  };
  //加入的数据为newTags 数组 需要拼接到原有数组中
  const handleInputConfirm = () => {
    let tempsTags = [...Tags];
    //判断输入的inputValue是否存在
    if (inputVisible && !Tags.map(({ label }) => label).includes(inputValue)) {
      //按照数据格式进行更新 将input输入的值加在tags数组中
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    setTags(tempsTags);
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(Tags || []).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handleInputConfirm}
          onBlur={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: "dashed" }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

export default TagList;
