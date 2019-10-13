import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// State
// Components use state to 'remember things'
// React components can have state by setting this.state in their constructors
// State is considered tio be private to a component that defines it

// bad approach: have board ask each square for its state
// proper approach: store the games state in the parent Board


class Square extends React.Component {
  // since this does not maintain state (instead it gets it from a parent), its known
  // as a 'controlled component'

  render() {
    return (
      // Note we must pass a FUNCTION (hence () => ).  This way react only
      // calls this function after a click.  If we just passed the alert 
      // without the function, the alert would fire each time the component 
      // is rendered
      <button 
        className="square" 
        onClick={() => this.props.onClick()} 
      >
        {this.props.value}
      </button>
    );
  }
}
  
class Board extends React.Component {
  constructor(props){
    // super() must be called when defining the constructor of a subclass
    // all react component classes that have a constructor should start it with a super(props) call
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    // bad approach: mutate squares directly
    // good apporach: replace squares with an updated copy (immutability example).
    //   this a better approach since it makes the following easier: 
    //        deteting changes
    //        determining when to re-render
    //        mainitaining state history
    //        easier refactoring

    const squares = this.state.squares.slice(); // slice creates a copy
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    // we pass the prop "value" from the parent Board to the child Square
    // the prop onClick is a function that Square can call when clicked
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
  
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  