import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

/* React components */
/* Layout */
/* Display */
const Display = props => {
  return <div id="display-screen">
    <div id="expression">{ props.expression }</div>
    <div id="display">{ props.display }</div>
  </div>
}

/* Keypad */
const Keypad = props => {
  const handlers = Object.assign({}, props.handlers);
  const keyProperties = [
    [
      {
        id: "clear",
        text: "AC",
        class: "symbol btn-red",
        handler: handlers.handleClear
      }
    ],
    [
      {
        id: "seven",
        text: "7",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "eight",
        text: "8",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "nine",
        text: "9",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "divide",
        text: "/",
        class: "symbol",
        handler: handlers.handleOperator
      }
    ],
    [
      
      {
        id: "four",
        text: "4",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "five",
        text: "5",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "six",
        text: "6",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "multiply",
        text: "X",
        class: "symbol",
        handler: handlers.handleOperator
      }
    ],
    [
      {
        id: "one",
        text: "1",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "two",
        text: "2",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "three",
        text: "3",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "subtract",
        text: "-",
        class: "symbol",
        handler: handlers.handleOperator
      },
    ],
    [
      {
        id: "decimal",
        text: ".",
        class: "digit",
        handler: handlers.handleDecimal
      },
      {
        id: "zero",
        text: "0",
        class: "digit",
        handler: handlers.handleDigit
      },
      {
        id: "equals",
        text: "=",
        class: "symbol btn-green",
        handler: handlers.handleEqual
      },
      {
        id: "add",
        text: "+",
        class: "symbol",
        handler: handlers.handleOperator
      },
    ]
  ];
  var keys = [];
  for(let i = 0; i < keyProperties.length; i++) {
    let row = [];
    for(let j = 0; j < keyProperties[i].length; j++) {
      let property = keyProperties[i][j];
      let button = <button key={property.id} 
                    id={property.id}
                    className={property.class}
                    onClick={property.handler}>
                    {property.text} </button>
      row.push(button);
    }
    keys.push(<div key={i} id={"row-" + i}>{row}</div>);
  }
  return <div id="keypad">
    {keys}
  </div>
};


/* Main app component */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      display: '0'
    };

    this.clearButtonClickHandler = this.clearButtonClickHandler.bind(this);
    this.digitsButtonClickHandler = this.digitsButtonClickHandler.bind(this);
    this.decimalButtonClickHandler = this.decimalButtonClickHandler.bind(this);
    this.operatorButtonClickHandler = this.operatorButtonClickHandler.bind(this);
    this.equalButtonClickHandler = this.equalButtonClickHandler.bind(this);
  }

  /* Clears the display area */ 
  clearDisplay() {
    this.setState({
      display: ''
    });
  }
  /* Returns the last number of the expression */
  getLastValue(expression) {
    var value = ''
    for(let i = expression.length - 1; i >= 0; i--) {
      if(['+', '-', 'X', '/'].some(val => val == expression[i])) {
        break;
      }
      value = expression[i] + value;
    }
    return value;
  }

  /* AC button handler */
  clearButtonClickHandler() {
    this.setState({
      expression: '',
      display: '0'
    });
  }

  /* Numbers button handler */
  digitsButtonClickHandler(event) {
    this.initDisplayWith('');
    var keyValue = $(event.target)[0].childNodes[0].data;
    var expr = this.state.display;
    /* Replace expr with keyValue when expr is zero
       or append keyValue to expr when expr is non-zero */
    if(expr == '0') {
      expr = keyValue;
    } else {
      expr += keyValue;
    }

    this.setState({
      display: expr
    });
  }

  /* Decimal button handler */
  decimalButtonClickHandler() {
    this.initDisplayWith('');
    var expr = this.state.display;
    var value = this.getLastValue(expr);
    if(value.indexOf('.') < 0) {
      expr += '.';
    }
    
    this.setState({
      display: expr
    });
  }

  /* Operators button handler */
  operatorButtonClickHandler(event) {
    
  }
  
  /* Equal button handler */
  equalButtonClickHandler() {
    
  }

  render() {
    return <div>
      {/* Display(result, expression) component */}
      <Display expression={this.state.expression} 
        display={this.state.display} />
      
      {/* Keypad component */}
      <Keypad handlers={
        {
          handleClear: this.clearButtonClickHandler,
          handleDigit: this.digitsButtonClickHandler,
          handleDecimal: this.decimalButtonClickHandler,
          handleOperator: this.operatorButtonClickHandler,
          handleEqual: this.equalButtonClickHandler
        }
      } />
    </div>
  }
}

/* Render App component on the page */
const container = document.getElementById('app');
ReactDOM.render(<App />, container);