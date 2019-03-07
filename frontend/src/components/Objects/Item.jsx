import React from "react";
import { Icon,  List, Card, Skeleton} from 'antd';
import { Link } from "react-router-dom";
import { func, shape, number, string } from "prop-types";
import moment from "moment";
import { formatSizeUnits } from "../../utils";
import "./item.less";

const Item = ({ 
    item, 
    remove 
  }) => {
    
    return (
      <List.Item>
        <Card size="small"
          actions={[
            <Link to={`/api/files/download?key=${item.key}`} download={item.name} target="_blank"><Icon type="download"/></Link>, 
            <Icon type="setting" />, 
            <Icon type="edit" />, 
            <Link to="/" onClick={e=>remove(item.key)} ><Icon type="delete"/></Link>,
          ]}
        >
          <Skeleton loading={false}>
            <Card.Meta
              title={item.name}
              description={
                <div>
                  <span styleName="span-size">
                    {`Size: ${formatSizeUnits(item.size)}`}
                  </span>
                  <span styleName="span-date-created">
                    {`Last modified: ${moment(item.lastModified).format('DD.MM.YYYY HH:mm')}`}
                  </span>
                </div>}
            />
          </Skeleton>
        </Card>
      </List.Item>
    );
  }

Item.propTypes = {
    item:shape({
        key: string,
        directory: string,
        name: string,
        lastModified: string,
        size: number,
        status: string,
        }).isRequired,
    remove: func.isRequired,
};

export default Item;