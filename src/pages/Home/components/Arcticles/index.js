import React from "react";
import { List, Tag } from "antd";
import { StarTwoTone, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import ArticleListContent from "../ArticleListContent";

const IconText = ({ icon, text }) => (
  <span>
    {icon} {text}
  </span>
);

const Articles = ({ list }) => {
  return (
    <List
      className={styles.articleList}
      size="large"
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          // list下方的点赞、评论之类的信息
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            <IconText
              key="message"
              icon={<MessageOutlined />}
              text={item.message}
            />,
          ]}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>React</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    ></List>
  );
};

export default Articles;
