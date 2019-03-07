import React from "react";
import { Upload, Icon } from 'antd';
import { func, string} from "prop-types";

const { Dragger } = Upload;

const MultipleUpload = ({ 
  upload, 
  finalDirectory 
}) => {

  const DraggerProps = {
    name: 'file',
    multiple: true,
    showUploadList: false, 
    customRequest: (info) => upload(info.file),
  };

  return (
    <Dragger {...DraggerProps} >
        <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Select or drag files to the download area.</p>
        <p className="ant-upload-text">Files will be created in the directory {finalDirectory}.</p>
        <p className="ant-upload-hint">Files with the same name will be replaced with the most recently downloaded files.</p>
    </Dragger>
  );
  
}

MultipleUpload.propTypes = {
    finalDirectory: string,
    upload: func.isRequired,
};

export default MultipleUpload;
