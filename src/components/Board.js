import React, { Component } from "react";

import Mario from "./Mario.js";
import Mushroom from "./Mushroom.js";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellWidth: 30,
      cellHeight: 30,
      mushrooms: [],
      score: 0
    };

    const getRandom = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const horizontalBlocks = this.props.horizontalBlocks;
    const verticalBlocks = this.props.verticalBlocks;

    for (let i = 0; i < this.totalMushrooms; i++) {
        console.log("total"+this.totalMushrooms)
      this.state.mushrooms.push({
        key: i,
        x: getRandom(0, horizontalBlocks - 1),
        y: getRandom(0, verticalBlocks - 1),
        remaining: true,
      });
    }
  }

  totalMushrooms = Math.round(
    (Number(this.props.horizontalBlocks) + Number(this.props.verticalBlocks)) / 2
  );

  eatMushroom = (foundMushroom) => {
    const updatedMushrooms = [...this.state.mushrooms];
    updatedMushrooms[foundMushroom.key].remaining = false;
    this.setState({
      mushrooms: updatedMushrooms,
      score: this.state.score + 1,
    });

    if (this.totalMushrooms === this.state.score) {
      console.log("completed!")
      alert("You ate all mashrooms")
    }
  };

  render() {
    const styles = {
      width: this.props.horizontalBlocks * this.state.cellWidth + "px",
      height: this.props.verticalBlocks * this.state.cellHeight + "px",
    };

    return (
      <div>
        <div className="board" style={styles}>
          <Mario
            boardConfig={{
              cellWidth: this.state.cellWidth,
              cellHeight: this.state.cellHeight,
              horizontalBlocks: this.props.horizontalBlocks,
              verticalBlocks: this.props.verticalBlocks,
            }}
            mushrooms={this.state.mushrooms}
            eatMushroom={this.eatMushroom}
          />
          {this.state.mushrooms
            .filter((mushroom) => {
              return mushroom.remaining;
            })
            .map((mushroom) => {
              return (
                <Mushroom
                  key={mushroom.key}
                  x={mushroom.x}
                  y={mushroom.y}
                  cellWidth={this.state.cellWidth}
                  cellHeight={this.state.cellHeight}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Board;
