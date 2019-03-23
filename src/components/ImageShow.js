import React, { Component } from "react";
import { Image } from "react-bootstrap";

class ImageShow extends Component {
  render() {
    const image = this.props.image;
    return (
      <div className="col single-image  col-md-3">
        <div className="">Yummy</div>
        <Image
          src={image.urls.small}
          alt=""
          className=""
          onClick={() => this.props.showModal(image)}
        />
        <p className="">{image.description}</p>
      </div>
    );
  }
}

export default ImageShow;
