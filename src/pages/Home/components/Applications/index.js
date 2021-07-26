import React from "react";
import numeral from "numeral";
import { List, Card, Tooltip, Avatar } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";

// const {Meta}=Card

const CardInfo = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>活跃用户</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>新增用户</p>
      <p>{newUser}</p>
    </div>
  </div>
);
//数量转换
function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return "";
  let result = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span>万</span>
      </span>
    );
  }
  return result;
}

const Applications = ({ list }) => {
  console.log(list);
  return (
    <List
      className={styles.filterCardList}
      grid={{
        gutter: 24,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 3,
      }}
      size="large"
      rowKey="id"
      dataSource={list}
      renderItem={(item) => {
        return (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip key="download" title="下载">
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip key="share" title="分享">
                  <ShareAltOutlined />
                </Tooltip>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={item.avatar} size="small" />}
                title={item.title}
              />
              {/* 卡片的信息 */}
              <div>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format("0,0")}
                />
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};

export default Applications;
