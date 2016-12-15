import React, {PropTypes, Component} from "react";
import UpLoadQiNiuImage from 'components/UpLoadQiNiuImage'

export default class ListImage extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    dataSource: []
  }
  render() {
    let click = this.props.itemClick;
    let value = this.props.value
    let listUpLoadImageFinish = this.props.listUpLoadImageFinish
    let dataSource = this.props.dataSource
    if (this.props.dataSource) {
      if (!(this.props.dataSource instanceof Array)) {
        dataSource = this.props.dataSource.split(",")
      }
    } else {
      dataSource = []
    }
    return <div>
      {dataSource.map((data, index) => {
        let src = value
          ? data[value]
          : data
        return <div className={this.props.imgItem} style={{
          float: "left"
        }} key={index}><UpLoadQiNiuImage src={src} className={this.props.imgStyle}  tag={index} upLoadImageFinish={listUpLoadImageFinish}/>
        </div>
      })}
    </div>;
  }
}
