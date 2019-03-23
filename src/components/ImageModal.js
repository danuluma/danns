import React, { Component } from "react";
import { Modal, FormGroup, Container, Col, Row, Button } from "react-bootstrap";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";

class ImageModal extends Component {
  state = {
    currentImage: null,
    currentImagebase64: null,
    toptext: "",
    bottomtext: "",
    isTopDragging: false,
    isBottomDragging: false,
    topY: "10%",
    topX: "50%",
    bottomX: "50%",
    bottomY: "90%"
  };

  componentDidUpdate = prevProps => {
    if (prevProps.image !== this.props.image) {
      this.loadImage(this.props.image.urls.raw);
    }
  };

  componentWillUnmount = () => {
    this.currentImage.removeEventListener("load", this.handleLoad);
  };

  loadImage = img => {
    this.currentImage = new window.Image();
    this.currentImage.src = img;
    this.currentImage.addEventListener("load", this.handleLoad);
  };

  handleLoad = () => {
    this.setState({
      currentImage: this.currentImage
    });

    // this.imageNode.getLayer().batchDraw();
  };

  render() {
    let newWidth = "200";
    let newHeight = "200";
    const { image, show, onHide, onSubmit } = this.props;
    const { currentImage } = this.state;

    console.log(currentImage);

    if (currentImage) {
      return (
        <Modal
          show={show}
          onHide={onHide}
          onSubmit={onSubmit}
          size="lg"
          centered="true"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Using Grid in Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col className="col-md-8">
                  <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                      <Image
                        x={newWidth}
                        y={newHeight}
                        image={this.state.currentImage}
                        ref={node => {
                          this.imageNode = node;
                        }}
                      />
                    </Layer>
                  </Stage>
                </Col>
                <Col className="col-md-4">Hey 4</Col>
              </Row>

              <Row className="show-grid">
                <Col className="col-md-6">Hey </Col>
                <Col className="col-md-6">Hey </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.submit}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return "";
  }
}

export default ImageModal;
