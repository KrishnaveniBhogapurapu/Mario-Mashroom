import React, { Component } from "react";

class Mario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y_axis: 1,
      x_axis: 1,
    };
  }

  boardConfig = this.props.boardConfig;
  mushrooms = this.props.mushrooms;
  steps = 0;

  takeStep = (direction) => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      switch (direction) {
        case 37:
          this.setState({
            y_axis: this.state.y_axis,
            x_axis: this.state.x_axis - 1,
          });
          this.checkDirection(direction);
          break;
        case 38:
          this.setState({
            y_axis: this.state.y_axis - 1,
            x_axis: this.state.x_axis,
          });
          this.checkDirection(direction);
          break;
        case 39:
          this.setState({
            y_axis: this.state.y_axis,
            x_axis: this.state.x_axis + 1,
          });
          this.checkDirection(direction);
          break;
        case 40:
          this.setState({
            y_axis: this.state.y_axis + 1,
            x_axis: this.state.x_axis,
          });
          this.checkDirection(direction);
          break;
        default:
          return;
      }
      clearInterval(this.intervalId);
    }, 2);

    const foundMushrooms = this.props.mushrooms.find(
      (mushroom) =>
        mushroom.x === this.state.x_axis &&
        mushroom.y === this.state.y_axis &&
        mushroom.remaining
    );
    if (foundMushrooms) {
      this.props.eatMushroom(foundMushrooms);
    }
  };

  checkDirection = (e) => {
    if (e.keyCode) {
      this.steps += 1;
    }
    const toDirection = e.keyCode || e;
    const { x_axis, y_axis } = this.state;
    const bottomLimit = this.boardConfig.verticalBlocks - 1;
    const rightLimit = this.boardConfig.horizontalBlocks - 1;

    if (!((x_axis > rightLimit - 1 && toDirection === 39) || (y_axis > bottomLimit - 1 && toDirection === 40)||(y_axis < 1 && toDirection === 38) || (x_axis < 1 && toDirection === 37))){
      // console.log(x_axis + "__" + y_axis)
      // console.log(rightLimit+"_limit_"+bottomLimit)
      // console.log("to direction"+toDirection)
      // console.log((y_axis > bottomLimit - 1 && toDirection === 40))
      this.takeStep(toDirection);
    }
  };

  componentDidMount() {
    window.onkeydown = this.checkDirection;
  }

  componentWillUnmount() {
    console.log("interval"+this.intervalId)
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const styles = {
      height: this.boardConfig.cellHeight + "px",
      width: this.boardConfig.cellWidth + "px",
      marginTop: this.state.y_axis * this.boardConfig.cellHeight + "px",
      marginLeft: this.state.x_axis * this.boardConfig.cellWidth + "px",
      backgroundImage: "url('/Mario-Mashroom/mario.png')",
    };
    return (
      <div>
        <div className="game mario" style={styles} />
      </div>
    );
  }
}

export default Mario;
