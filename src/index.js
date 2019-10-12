import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// State
// Components use state to 'remember things'
// React components can have state by setting this.state in their constructors


class Square extends React.Component {
  constructor(props) {
    // super() must be called when defining the constructor of a subclass
    // all react component classes that have a constructor should start it with a super(props) call
    super(props);  
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      // Note we must pass a FUNCTION (hence () => ).  This way react only
      // calls this function after a click.  If we just passed the alert 
      // without the function, the alert would fire each time the component 
      // is rendered
      <button 
        className="square" 
        // calling this.setState from the onClick tells react to re-render the square whenever the button is clicked
        // when you call setState in a component, react automatically updates the child components inside of it too
        onClick={() => this.setState({value: 'X'})} 
      >
        {this.state.value}
      </button>
    );
  }
}
  
class Board extends React.Component {
  renderSquare(i) {
    // we pass the prop "value" from the parent Board to the child Square
    return <Square value={i} />;
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
  