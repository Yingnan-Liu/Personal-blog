import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Divider, Avatar } from "antd";
import {
  ContactsOutlined,
  ClusterOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Articles from "./components/Arcticles";
import Applications from "./components/Applications";
import Projects from "./components/Projects";
import TagList from "./components/TagList";
import { currentUser, fakeList } from "./data";
import styles from "./index.module.less";

const articleList = fakeList(10);
const applicationList = fakeList(10);
const projectList = fakeList(10);

const tabList = [
  {
    key: "articles",
    tab: (
      <span>
        文章<span>(5)</span>
      </span>
    ),
  },
  {
    key: "applications",
    tab: (
      <span>
        应用<span>(8)</span>
      </span>
    ),
  },
  {
    key: "projects",
    tab: (
      <span>
        项目<span>(5)</span>
      </span>
    ),
  },
];
//通过tabList切换组件 是不需要路由的
const renderChildrenByTabKey = (tabKey) => {
  switch (tabKey) {
    case "projects":
      return <Projects list={projectList} />;
    case "applications":
      return <Applications list={applicationList} />;
    case "articles":
      return <Articles list={articleList} />;
    default:
      break;
  }
};

const renderUserInfo = () => {
  return (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined className={styles.userInfoIcon} />
        {currentUser.title}
      </p>
      <p>
        <ClusterOutlined className={styles.userInfoIcon} />
        {currentUser.group}
      </p>
      <p>
        <HomeOutlined className={styles.userInfoIcon} />
        {(currentUser.geographic || { province: { label: "" } }).province.label}
        {(currentUser.geographic || { city: { label: "" } }).city.label}
      </p>
    </div>
  );
};

const Home = () => {
  const [tabKey, setTabKey] = useState("articles");
  const onTabChange = (key) => {
    setTabKey(key);
  };
  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col lg={7} sm={24}>
          {/* 左侧卡片 */}
          <Card style={{ marginBottom: "24" }}>
            {/* 头像+签名 */}
            <div className={styles.avatarHolder}>
              <img src={currentUser.avatar} alt="" />
              <div className={styles.name}>{currentUser.name}</div>
              <div>{currentUser.signature}</div>
            </div>
            {/* 个人介绍 */}
            {renderUserInfo(currentUser)}
            <Divider dashed />
            {/* Tags */}
            <TagList tags={currentUser.tags} />
            <Divider dashed />
            {/* 团队介绍 */}
            <div className={styles.team}>
              <div className={styles.teamTitle}>团队</div>
              <Row gutter={36}>
                {currentUser.notice &&
                  currentUser.notice.map((item) => {
                    return (
                      <Col key={item.id} lg={24} xl={12}>
                        <Link to="/setting">
                          <Avatar size="small" src={item.logo} />
                          {item.member}
                        </Link>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Card>
        </Col>
        {/* 右边Tabs内容 根据tabKey和onTabChange事件切换组件 */}
        <Col lg={17} sm={24}>
          <Card
            tabList={tabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
