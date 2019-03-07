import React from "react";
import { Layout, Row, Col} from "antd";
import { withRouter } from "react-router";
import { arrayOf, shape, string, number, func } from "prop-types";
import { withGlobalStore } from "../store";
import { findGetParameter } from "../utils";
import Directories from "../components/Directories";
import MultipleUpload from "../components/MultipleUpload";
import Objects from "../components/Objects";
import "./index.less";

const { Content } = Layout;

class Home extends React.Component {

  componentWillMount() {
    const {location: {search}, setRootDirectory} = this.props;
    const rootDirectory = findGetParameter(search, "root");
    setRootDirectory(rootDirectory);
  };

  render() {

    return (
      <Layout>
        <Content styleName="content">
          <Row gutter={24}>
            <Col span={9}>
              <Directories 
                selectedDirectory={this.props.selectedDirectory}
                directories={this.props.directories}
                setNewDirectory={this.props.setNewDirectory}
                setSelectedDirectory={this.props.setSelectedDirectory}
                newDirectory={this.props.newDirectory}
              />
            </Col>
            <Col span={15}>
              <MultipleUpload 
                upload={this.props.upload} 
                finalDirectory={this.props.finalDirectory}
              />
            </Col>
          </Row>
          <Objects 
            objects={this.props.objects} 
            remove={this.props.remove}
          />
        </Content>
      </Layout>
    );
  }
}

Home.propTypes = {
  location: shape().isRequired,
  rootDirectory: string,
  finalDirectory: string,
  newDirectory: string,
  selectedDirectory: string,
  objects: arrayOf(
    shape({
      key: string,
      directory: string,
      name: string,
      lastModified: string,
      size: number,
      status: string,
    }),
  ),
  directories: arrayOf(string),
  remove: func,
  setRootDirectory: func,
  upload: func,
  setSelectedDirectory: func,
  setNewDirectory: func,
};

const mapStateToProps = state => ({
  objects: state.objects,
  rootDirectory: state.rootDirectory,
  finalDirectory: state.finalDirectory,
  selectedDirectory: state.selectedDirectory,
  directories: state.directories,
  newDirectory: state.newDirectory,
});

const mapActionsToProps = actions => ({
  setRootDirectory: actions.setRootDirectory,
  remove: actions.remove,
  upload: actions.upload,
  setSelectedDirectory: actions.setSelectedDirectory,
  setNewDirectory: actions.setNewDirectory,
});

export default withGlobalStore(withRouter(Home), mapStateToProps, mapActionsToProps);
