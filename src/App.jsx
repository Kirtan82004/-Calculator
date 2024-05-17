import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearDisplay = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleKeyDown = (event) => {
    let { key } = event;

    if (key === 'Enter') key = '=';

    if (/\d/.test(key)) {
      inputDigit(parseInt(key, 10));
    } else if (key === '.') {
      inputDot();
    } else if (key in { '+': 1, '-': 1, '*': 1, '/': 1 }) {
      performOperation(key);
    } else if (key === '=') {
      performOperation(operator);
      setOperator(null);
    } else if (key === 'Backspace') {
      setDisplay(display.substring(0, display.length - 1) || '0');
    } else if (key === 'Clear') {
      clearDisplay();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, operator, prevValue]);

  return (
    <div id="calculator">
      <div id="display" className="display">{display}</div>
      <div className="buttons">
        <button id="clear" className="btn btn-clear" onClick={clearDisplay}>AC</button>
        <button id="divide" className="btn btn-operator" onClick={() => performOperation('/')}>/</button>
        <button id="multiply" className="btn btn-operator" onClick={() => performOperation('*')}>*</button>
        <button id="subtract" className="btn btn-operator" onClick={() => performOperation('-')}>-</button>
        <button id="add" className="btn btn-operator" onClick={() => performOperation('+')}>+</button>
        <button id="equals" className="btn btn-equals" onClick={() => performOperation('=')}>=</button>
        <button id="decimal" className="btn btn-number" onClick={inputDot}>.</button>
        <button id="zero" className="btn btn-number" onClick={() => inputDigit(0)}>0</button>
        <button id="one" className="btn btn-number" onClick={() => inputDigit(1)}>1</button>
        <button id="two" className="btn btn-number" onClick={() => inputDigit(2)}>2</button>
        <button id="three" className="btn btn-number" onClick={() => inputDigit(3)}>3</button>
        <button id="four" className="btn btn-number" onClick={() => inputDigit(4)}>4</button>
        <button id="five" className="btn btn-number" onClick={() => inputDigit(5)}>5</button>
        <button id="six" className="btn btn-number" onClick={() => inputDigit(6)}>6</button>
        <button id="seven" className="btn btn-number" onClick={() => inputDigit(7)}>7</button>
        <button id="eight" className="btn btn-number" onClick={() => inputDigit(8)}>8</button>
        <button id="nine" className="btn btn-number" onClick={() => inputDigit(9)}>9</button>
      </div>
    </div>
  );
};

export default App;
