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

  /* Key properties. HTML buttons will be created on these properties */
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
        text: "x",
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
        handler: handlers.handleZero
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
  // Array, will contain buttons
  var keys = [];
  for(let i = 0; i < keyProperties.length; i++) {
    // Local array, will contain buttons for each row
    let row = [];
    for(let j = 0; j < keyProperties[i].length; j++) {
      let property = keyProperties[i][j];
      // Create the button with current properties
      let button = <button key={property.id} 
                    id={property.id}
                    className={property.class}
                    onClick={property.handler}>
                    {property.text}</button>
      // Push the button in the row array
      row.push(button);
    }
    // push all the buttons in the keys array and assign id in every row
    keys.push(<div key={i} id={"row-" + i}>{row}</div>);
  }

  // Return the buttons inside a div having id 'keypad'
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
    this.zeroButtonClickHandler = this.zeroButtonClickHandler.bind(this);
    this.decimalButtonClickHandler = this.decimalButtonClickHandler.bind(this);
    this.operatorButtonClickHandler = this.operatorButtonClickHandler.bind(this);
    this.equalButtonClickHandler = this.equalButtonClickHandler.bind(this);

    var equalButtonClicked = false;
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
    var btnClicked = $(event.target).text().trim(); // clicked button
    var expression = this.state.expression; // current expression value
    var display = this.state.display; // current display value

    /* If digits are clicked after clicking equals button,
    initialize the display and expression value first */
    if(this.equalButtonClicked) {
      expression = '';
      display = '0';
      
      // set the equalBtnClicked to false
      this.equalButtonClicked = false;
    }

    /* If the display have any operator set it to zero first */
    if(this.isOperator(display)) {
      display = '0';
    }

    /* If the current display value is zero then replace this with the
    btnClicked value. Else append the btnClicked value with the current
    display value */
    if(display == '0') {
      display = btnClicked;
    } else {
      display += btnClicked;
    }

    /* Set the state */
    this.setState({
      display: display,
      expression: expression + btnClicked
    });
  }

  /* Zero button handler */
  zeroButtonClickHandler() {
    /* Retrieve the current display and expression values */
    var expression = this.state.expression;
    var display = this.state.display;

    /* If the display have any operator set it to zero first
    and append zero to the expression */
    if(this.isOperator(display)) {
      display = '0';
      expression += '0';
    }
    
    /* If zero button clicked after clicking equals button,
    initialize the display and expression value first */
    if(this.equalButtonClicked) {
      expression = '';
      display = '0';
      
      // set the equalBtnClicked to false
      this.equalButtonClicked = false;
    }

    /* Zero will be appended with current display value
    only if the display value is non-zero */
    if(display != '0') {
      display += '0';
      expression += '0';
    }

    /* Set the state */
    this.setState({
      expression: expression,
      display: display
    });
  }

  /* Decimal button handler */
  decimalButtonClickHandler() {
    /* Retrieve the current display and expression values */
    var expression = this.state.expression;
    var display = this.state.display;

    var lastOperand = this.getLastOperand(expression);

    /* If the display have any operator set it to zero first */
    if(this.isOperator(display)) {
      display = '0';
    }

    /* If decimal is clicked after clicking equals button,
    initialize the display and expression value first */
    if(this.equalButtonClicked) {
      expression = '';
      display = '0';
      
      // set the equalBtnClicked to false
      this.equalButtonClicked = false;
    }

    /* Append the decimal if and only 
    if the lastOperand has no decimal points */
    if(lastOperand.indexOf('.') < 0) {
      display += '.';
      expression += '.';
    }

    /* Set the state */
    this.setState({
      expression: expression,
      display: display
    });
  }

  /* Operators button handler */
  operatorButtonClickHandler(event) {
    /* Retrieve the current expression and display values */
    var display = this.state.display;
    var expression = this.state.expression;

    var operator = $(event.target).text().trim();

    /* If operatore button is pressed after clicking 
    equal button, the operation will be performed on current result
    which is stored in display */
    if(this.equalButtonClicked) {
      // set the value of the expression to the current display value
      expression = display;

      // Reset equalButtonClicked
      this.equalButtonClicked = false;
    }

    // set display to operator
    display = operator;

    /* If the last character of the expression is an operator,
    replace that operator with current operator value, else
    append the operator to the expression */
    var indexOfLastChar = expression.length - 1;
    if(this.isOperator(expression[indexOfLastChar])) {
      // replace
      expression = expression.slice(0, indexOfLastChar) + operator;
    } else {
      // append
      expression += operator;
    }

    /* Set the state */
    this.setState({
      expression: expression,
      display: display
    });
  }
  
  /* Equal button handler */
  equalButtonClickHandler() {
    var expression = this.state.expression; // current expression value

    /* Remove any trailing operator symbols */
    if(this.isOperator(expression[expression.length - 1])) {
      expression = expression.slice(0, expression.length - 1);
    }
    
    /* In the expression multiplication symbol is represented as
    'x'. First replace those 'x' with '*' */
    var expressionToEvaluate = expression.replace(/x/g, '*');

    /* Evaluate and set the state with current values; if 
    and only if expression contains any value */
    if(expression != '') this.setState({
      expression: expression,
      display: (+eval(expressionToEvaluate).toFixed(4)).toString()
    });

    // set the equalBtnClicked to true
    this.equalButtonClicked = true;
  }

  /* Returns true if the argument is an operator,
  otherwise false */
  isOperator(char) {
    return ['x', '/', '+', '-'].some(op => op == char);
  }

  /* Returns the last operand of expression atgument */
  getLastOperand(expression) {
    /* Reverse the current expression */
    var localExpression = expression.split('').reverse().join('');

    var value = '';
    /* Check and append the character with value until found
    an operator or reach at the end */
    for(let i = 0; i < localExpression.length; i++) {
      let char = localExpression[i];
      if(this.isOperator(char)) {
        break;
      }
      value += char;
    }

    return value;
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
          handleZero: this.zeroButtonClickHandler,
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