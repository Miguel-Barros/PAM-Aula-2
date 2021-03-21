// Const é um tipo de variavel fixa.
// [{é um array},]
const types = [
  { value: "0" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "7" },
  { value: "8" },
  { value: "9" },
  { value: "soma", signal: "+" },
  { value: "dividir", signal: "/" },
  { value: "multiplicar", signal: "x" },
  { value: "subtrair", signal: "-" },
  { value: "virgula", signal: "," },
  { value: "resultado", signal: "=" },
  { value: "backspace", signal: "⌫" },
  { value: "c", signal: "C" },
]

// let é um tipo de variavel flexivel (pode ser alterada pelo decorrer do codigo)
let accumulatedValue = "";
let operator = "";
let value = "";
let currentNumber = "";
let calc = true;

// converte todo o valor que é pego do display em um valor calculavel (number)
const convertToCalculable = (display) => {
  const calculable = display.replaceAll("x", "*").replaceAll(",", ".");
  return calculable;
}

// forEach é o mesmo que um for comum, muda apenas o fato de ser mais simples utiliza-lo
types.forEach((t) => {
  // verifica qual botão do Array esta sendo clicado e retorna o mesmo.
  $(document).on("click", "#" + t.value, function () {

    if (t.signal === "C") {
      currentNumber = "";
      accumulatedValue = "";
      operator = "";
      value = "";
    } else if (t.signal == "=" && (!accumulatedValue)) {
        accumulatedValue = "";
    } else if (['-', 'x', '+', '/', '='].includes(t.signal)) {
      calc = true;
     if (t.signal != "=") {
        calc = false;
        operator = t.signal;
        
        if(accumulatedValue && operator && !value) {
          accumulatedValue = String(eval(convertToCalculable(accumulatedValue + operator + currentNumber)));
          currentNumber = accumulatedValue;
          
        } else {
          accumulatedValue = currentNumber;
        }
      } else if(value != '') {
         accumulatedValue = currentNumber; 
      }

        if (operator) {
          if (calc && value === '') {
            value = currentNumber;
          }

          if(calc && value === '')currentNumber = "";
        }


      if(calc) currentNumber = String(eval(convertToCalculable(accumulatedValue + operator + value)));

    } else if (t.signal == "⌫") {
      currentNumber = currentNumber.slice(0, -1);
    } else {
      if(!calc) {
        currentNumber = "";
        calc = true;
      }
      currentNumber += (t.signal || t.value);
    }

// exibe no painel secundario os valores anteriores juntos
    $("#calc").val(accumulatedValue + operator + value + (!accumulatedValue || operator ? "" : "="));
    
    // exibe inicialmente no painel principal o valor 0 
    $("#painel").val(currentNumber || "0")
  });
})
