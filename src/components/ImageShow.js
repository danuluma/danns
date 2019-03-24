import React, { Component } from "react";
import { Image } from "react-bootstrap";
import ReadMoreReact from "read-more-react";

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
        <p className="">
          <ReadMoreReact
            text={image.description ? image.description : ""}
            min={40}
            ideal={50}
            max={60}
            readMoreText="... read more"
          />
        </p>
      </div>
    );
  }
}

export default ImageShow;
