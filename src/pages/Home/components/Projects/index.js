import React from "react";
import { List, Card } from "antd";
import moment from "moment";
import styles from "./index.module.less";

const Projects = ({ list }) => {
  return (
    <List
      rowKey="id"
      grid={{
        gutter: 24,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 3,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={
                <a target="__blank" href="/login">
                  {item.title}
                </a>
              }
              description={item.subDescription}
            ></Card.Meta>
            {/* 时间戳 */}
            <div className={styles.timeStamp}>
              <span>{moment(item.updateAt).fromNow()}</span>
            </div>
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

export default Projects;
