import React from "react";
import { List } from 'antd';
import { func, shape, arrayOf, number, string } from "prop-types";
import Item from "./Item";
import "./index.less";

const ListObjects = ({ 
  objects, 
  remove 
}) => {
  const colCount = objects.length > 4 ? 4: objects.length;

  return (
    <List styleName="list-main"
      grid={{ gutter: 16, column: colCount }}
      dataSource={objects}
      renderItem={item => <Item item={item} remove={remove}/>}
    />
  );
}

ListObjects.propTypes = {
    objects: arrayOf(
      shape({
        key: string,
        directory: string,
        name: string,
        lastModified: string,
        size: number,
        status: string,
      }),
    ).isRequired,
    remove: func.isRequired,
};

export default ListObjects;
