import React, { Component } from "react";
import {
  Form,
  Modal,
  FormGroup,
  Container,
  Col,
  Row,
  Button
} from "react-bootstrap";
import { Stage, Layer, Image, Text } from "react-konva";
import Konva from "konva";
import local from "../images/image.jpeg";

let history = [
  {
    topY: 50,
    topX: 250,
    bottomY: 550,
    bottomX: 250
  }
];
let historyStep = 0;

class ImageModal extends Component {
  state = {
    currentImage: null,
    toptext: " Top Text",
    bottomtext: " Bottom Text",
    isTopDragging: false,
    isBottomDragging: false,
    bottomX: "50%",
    bottomY: "90%",
    position: history[0],
    typedTop: false,
    typedBottom: false,
    colour: "blue"
  };

  componentWillReceiveProps = props => {
    if (props.image) {
      this.loadImage(props.image.urls.raw);
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.image !== this.props.image) {
      this.loadImage(this.props.image.urls.raw);
    }
    console.log(this.state.currentImage);
  };

  loadImage = img => {
    let newImage = new window.Image();
    newImage.crossOrigin = "anonymous";
    newImage.src = img;
    // newImage.src = local;

    console.log(local);
    this.setState({
      currentImage: newImage
    });
    // this.currentImage.addEventListener("load", this.handleLoad);
  };

  handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    this.setState(prevState => ({
      position: previous
    }));
  };

  handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    this.setState(prevState => ({
      ...prevState,
      position: next
    }));
  };

  handleTopDragEnd = e => {
    history = history.slice(0, historyStep + 1);
    const pos = {
      ...history[history.length - 1],
      topX: e.target.x(),
      topY: e.target.y()
    };
    history = history.concat([pos]);
    historyStep += 1;
    this.setState(prevState => ({
      ...prevState,
      position: pos,
      isTopDragging: false
    }));
  };

  handleBottomDragEnd = e => {
    history = history.slice(0, historyStep + 1);
    const pos = {
      ...history[history.length - 1],
      bottomX: e.target.x(),
      bottomY: e.target.y()
    };
    history = history.concat([pos]);
    historyStep += 1;
    this.setState(prevState => ({
      ...prevState,
      position: pos,
      isBottomDragging: false
    }));
  };

  // function from https://stackoverflow.com/a/15832662/512042
  downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    console.log(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  saveThis = () => {
    let stage = document.getElementsByTagName("canvas")[0];
    let dataURL = stage.toDataURL("image/png");
    console.log(dataURL);
    this.downloadURI(dataURL, "stage.png");
  };

  handleClick = e => {
    console.log(e.target);
  };

  handleChange = e => {
    e.preventDefault();
    if (e.target.name === "toptext") {
      this.setState({
        [e.target.name]: e.target.value,
        typedTop: true
      });
    }
    if (e.target.name === "bottomtext") {
      this.setState({
        [e.target.name]: e.target.value,
        typedBottom: true
      });
    }
  };

  nimeFocus = e => {
    if (!this.state.typedTop || !this.state.typedBottom) {
      this.setState({
        [e.target.name]: ""
      });
    }
  };
  render() {
    let newWidth = 600;
    let newHeight = 600;
    // let newWidth = window.innerWidth;
    // let newHeight = window.innerHeight;

    const { image, show, onHide, onSubmit } = this.props;
    const { currentImage, colour } = this.state;

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
              Make a meme
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col className="col-md-12" id="hapa">
                  <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    container="#hapa"
                  >
                    <Layer>
                      <Image
                        x={0}
                        y={0}
                        width={newWidth}
                        height={newHeight}
                        image={this.state.currentImage}
                        ref={node => {
                          this.imageNode = node;
                        }}
                      />
                      <Text
                        className="maText"
                        fontSize={30}
                        fontStyle="bold italic"
                        align="center"
                        verticalAlign="middle"
                        lineHeight={1.5}
                        text={this.state.toptext}
                        x={this.state.position.topX}
                        y={this.state.position.topY}
                        onClick={e => this.handleClick(e)}
                        draggable
                        fill={this.state.isTopDragging ? "green" : colour}
                        onDragStart={() => {
                          this.setState({
                            isTopDragging: true
                          });
                        }}
                        onDragEnd={e => this.handleTopDragEnd(e)}
                      />

                      <Text
                        className="maText"
                        fontSize={30}
                        fontStyle="bold italic"
                        align="center"
                        lineHeight={1.5}
                        text={this.state.bottomtext}
                        x={this.state.position.bottomX}
                        y={this.state.position.bottomY}
                        draggable
                        fill={this.state.isBottomDragging ? "green" : colour}
                        onDragStart={() => {
                          this.setState({
                            isBottomDragging: true
                          });
                        }}
                        onDragEnd={e => this.handleBottomDragEnd(e)}
                      />
                    </Layer>
                  </Stage>
                </Col>
              </Row>

              <Row className="show-grid">
                <Col className="col-md-3" />

                <Col className="col-md-6">
                  <Form>
                    <Form.Group controlId="topText">
                      <Form.Label>Top Text</Form.Label>
                      <Form.Control
                        type="text"
                        name="toptext"
                        value={this.state.toptext}
                        onFocus={this.nimeFocus}
                        onChange={this.handleChange}
                        placeholder="Enter Top Text"
                      />
                    </Form.Group>
                    <Form.Group controlId="bottomText">
                      <Form.Label>Bottom Text</Form.Label>
                      <Form.Control
                        type="text"
                        name="bottomtext"
                        onFocus={this.nimeFocus}
                        value={this.state.bottomtext}
                        onChange={this.handleChange}
                        placeholder="Enter Bottom Text"
                      />
                    </Form.Group>
                  </Form>
                </Col>

                <Col className="col-md-3" />
              </Row>
              <Row className="show-grid">
                <Col className="col-md-4">
                  <Button onClick={this.handleUndo}>Undo </Button>
                </Col>
                <Col className="col-md-4">
                  <Button onClick={this.handleRedo}> Redo </Button>
                </Col>
                <Col className="col-md-4">
                  <Button onClick={this.saveThis}> Save </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.submit}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return "Loading";
  }
}

export default ImageModal;
