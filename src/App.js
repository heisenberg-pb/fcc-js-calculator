import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';


/* React components */
/* Layout */
/* Display */
const Display = props => {
  return <div id="display">
    <div id="result">{ props.result }</div>
    <div id="expression">{ props.expression }</div>
  </div>
}

/* Keypad */
const Keypad = () => {
  const keyProperties = [
    [
      {
        id: "clear",
        text: "C",
        class: "symbol"
      }
    ],
    [
      {
        id: "seven",
        text: "7",
        class: "digit"
      },
      {
        id: "eight",
        text: "8",
        class: "digit"
      },
      {
        id: "nine",
        text: "9",
        class: "digit"
      },
      {
        id: "divide",
        text: "/",
        class: "symbol"
      }
    ],
    [
      
      {
        id: "four",
        text: "4",
        class: "digit"
      },
      {
        id: "five",
        text: "5",
        class: "digit"
      },
      {
        id: "six",
        text: "6",
        class: "digit"
      },
      {
        id: "multiply",
        text: "X",
        class: "symbol"
      }
    ],
    [
      {
        id: "one",
        text: "1",
        class: "digit"
      },
      {
        id: "two",
        text: "2",
        class: "digit"
      },
      {
        id: "three",
        text: "3",
        class: "digit"
      },
      {
        id: "subtract",
        text: "-",
        class: "symbol"
      },
    ],
    [
      {
        id: "decimal",
        text: ".",
        class: "digit"
      },
      {
        id: "zero",
        text: "0",
        class: "digit"
      },
      {
        id: "equals",
        text: "=",
        class: "symbol"
      },
      {
        id: "add",
        text: "+",
        class: "symbol"
      },
    ]
  ];
  var keys = [];
  for(let i = 0; i < keyProperties.length; i++) {
    let row = [];
    for(let j = 0; j < keyProperties[i].length; j++) {
      let button = <button key={keyProperties[i][j].id} 
                    id={keyProperties[i][j].id}
                    className={keyProperties[i][j].class}>
                    {keyProperties[i][j].text} </button>
      row.push(<div key={j}>{button}</div>);
    }
    keys.push(<div key={i} id={"row-" + i}>{row}</div>);
  }
  return <div id="keypad">
    {keys}
  </div>
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      result: ''
    }
  }

  render() {
    return <div>
      <Display expression={this.state.expression} 
        result={this.state.result} />
      <Keypad />
    </div>
  }
}

const container = document.getElementById('app');
ReactDOM.render(<App />, container);