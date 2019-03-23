import React, { Component } from "react";
import ImageList from "./ImageList";
import ImageModal from "./ImageModal";
const Unsplash = require("unsplash-js").default;

const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_ID,
  secret: process.env.REACT_APP_SECRET
});

class Home extends Component {
  state = {
    images: [],
    currentImage: null,
    openModal: false
  };

  componentDidMount = () => {
    unsplash.search
      .photos("food", 1, 20)
      .then(data => data.json())
      .then(resp => {
        let imageList = resp.results;
        this.setState({ images: imageList });
      });
  };

  showImageModal = image => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      currentImage: image
    }));
  };
  modalClose = () => {
    this.setState(prevState => ({
      openModal: !prevState.openModal
    }));
  };
  render() {
    return (
      <React.Fragment>
        <ImageList
          images={this.state.images}
          showImageModal={data => this.showImageModal(data)}
        />
        <ImageModal
          image={this.state.currentImage}
          show={this.state.openModal}
          onHide={this.modalClose}
          submit={this.modalClose}
        />
      </React.Fragment>
    );
  }
}

export default Home;
