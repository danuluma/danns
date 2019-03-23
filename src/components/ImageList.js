import React, { Component } from "react";
import ImageShow from "./ImageShow";

class ImageList extends Component {
  render() {
    const images = this.props.images;
    return (
      <div className="row">
        {images.map(image => (
          <ImageShow
            image={image}
            // onClick={this.props.imageClicked}
            // onClick={console.log("jjj")}
            showModal={data => this.props.showImageModal(data)}
            key={image.id}
          />
        ))}
      </div>
    );
  }
}

export default ImageList;
