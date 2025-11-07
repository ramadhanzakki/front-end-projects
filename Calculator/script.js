const mainScreen = document.querySelector('[data-main-screen]');
const subScreen = document.querySelector('[data-sub-screen]');
const buttonContainer = document.querySelector('[data-buttons-container]');

let buffer = '0';
let runningTotal = 0;
let previousOperator = null;
let subScreenText = '';

function buttonClick(value) {
  if (isNaN(parseInt(value)) && value !== '.') {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'DEL': 
      buffer = '0';
      runningTotal = 0;
      previousOperator = null;
      subScreenText = '';
      break;

    case 'RESULT':
      if (previousOperator === null) {
        return;
      }
      flushOperations(parseFloat(buffer)); 
      previousOperator = null;
      buffer = formatResult(runningTotal);
      runningTotal = 0;
      subScreenText = '';
      break; 

    case 'LOG':
      if (buffer === '0' || buffer === 'Infinity') return;
      subScreenText = `log(${buffer})`;
      buffer = formatResult(Math.log10(parseFloat(buffer)));
      break;

    case '√':
      if (buffer === '0' || buffer === 'Infinity') return; 
      subScreenText = `√(${buffer})`;
      buffer = formatResult(Math.sqrt(parseFloat(buffer)));
      break;

    case '.':
      if (!buffer.includes('.')) { 
        buffer += '.';
      }
      break;

    case '+':
    case '-':
    case 'x':
    case '÷':
      handleMath(symbol);
      break;
  }
}

function handleNumber(numberString) {
  if (buffer === '0' || buffer === "Infinity" || buffer === 'NaN') {
    buffer = numberString;
  } else {
    if (buffer.length >= 12) return;
    buffer += numberString;
  }
}

function handleMath(symbol) {
  if (buffer === '0' && previousOperator === null) {
    runningTotal = 0;
    subScreenText = `0 ${symbol}`;
  } else if (buffer === '0' && previousOperator !== null) {
    previousOperator = symbol;
    subScreenText = `${formatResult(runningTotal)} ${symbol}`;
    return;
  } else {
    const floatBuffer = parseFloat(buffer);
    if (runningTotal === 0 && previousOperator === null) {
      runningTotal = floatBuffer;
    } else {
      flushOperations(floatBuffer);
    }
    subScreenText = `${formatResult(runningTotal)} ${symbol}`;
  }

  previousOperator = symbol;
  buffer = '0';
}

function flushOperations(floatBuffer) { 
  if (previousOperator === '+') {
    runningTotal += floatBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= floatBuffer;
  } else if (previousOperator === 'x') {
    runningTotal *= floatBuffer;
  } else if (previousOperator === '÷') {
    if (floatBuffer === 0) {
      runningTotal = Infinity;
    } else {
      runningTotal /= floatBuffer;
    }
  }
}


function formatResult(number) {
  if (number === Infinity || number === -Infinity) return 'Infinity'; 
  if (isNaN(number)) return 'NaN';
  return parseFloat(number.toPrecision(8)).toString();
}

function rerender() {
  let displayBuffer = buffer.toString();
  if (displayBuffer.length > 14) {
    mainScreen.innerText = parseFloat(displayBuffer).toExponential(5);
  } else {
    mainScreen.innerText = displayBuffer;
  }

  let displaySubText = subScreenText
    .replace('-', '−')
    .replace('x', '×')
    .replace('÷', '÷');
  subScreen.innerText = displaySubText;
}

function init() {
  buttonContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
      let buttonValue = event.target.innerText;
      
      if (buttonValue === '−') { 
        buttonValue = '-';
      } else if (buttonValue === '×') {
        buttonValue = 'x';
      }

      buttonClick(buttonValue);
    }
  });
}

init();

