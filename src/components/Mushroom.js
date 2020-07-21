import React, { Component } from "react";

class Mushroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
      cellWidth: this.props.cellWidth,
      cellHeight: this.props.cellHeight,
    };
  }

  render() {
    const styles = {
      width: this.state.cellWidth + "px",
      height: this.state.cellHeight + "px",
      marginLeft: this.state.x * this.state.cellWidth + "px",
      marginTop: this.state.y * this.state.cellHeight + "px",
      backgroundImage: "url('/Mario-Mashroom/mushroom.png')",
    };
    return (
      <div>
        <div className="game mushroom" style={styles} />
      </div>
    );
  }
}

export default Mushroom;
