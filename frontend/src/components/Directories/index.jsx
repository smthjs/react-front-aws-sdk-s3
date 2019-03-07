import React from "react";
import { Select, Input,  Row, Col} from 'antd';
import { func, arrayOf, string} from "prop-types";
import "./index.less";

const { Option } = Select;

const Directories = ({
  selectedDirectory, 
  directories, 
  setNewDirectory, 
  setSelectedDirectory, 
  newDirectory
}) => {
    return (
      <div>
        <div styleName="directory">
          <Row styleName="row">
            <Col span={12}>
              <span styleName="text-directory">Directory:</span>
            </Col>
            <Col span={12}>
              <Select styleName="select-directory" value={selectedDirectory} onChange={value=>setSelectedDirectory(value)}>
                {directories.map(x=><Option key={x} value={x}>{x}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row styleName="row">
            <Col span={12}>
              <span styleName="text-new-directory">New directory:</span>
            </Col>
            <Col span={12}>
              <Input styleName="edit-new-directory" value={newDirectory} onChange={e=>setNewDirectory(e.target.value)}/>
            </Col>
          </Row>
        </div>
          <p styleName="hint">Fill in the 'New directory' field if you want to create a subdirectory in the current directory, otherwise leave the field empty.</p>  
      </div>
    );
}

Directories.propTypes = {
  selectedDirectory: string,
  newDirectory: string,
  directories: arrayOf(string).isRequired,
  setSelectedDirectory: func.isRequired,
  setNewDirectory: func.isRequired,
};

export default Directories;