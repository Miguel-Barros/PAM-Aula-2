const types = [
  {
    value: "somar",
    signal: "+",
  },
  {
    value: "dividir",
    signal: "/",
  },
  {
    value: "multiplicar",
    signal: "x",
  },
  {
    value: "subtrair",
    signal: "-",
  },
  {
    value: "resultado",
    signal: "=",
  },
]


for (let i = 0; i <= 9; i++) {
  $(document).on("click", "#" + i, function () {
    const newI = [...i];
    $("#painel").val(newI)
    types.map((result) => {
      $(document).on("click", "#" + result.value, function () {
        if (result.signal == "-") {
          // let result = [...result, i];
          // console.log(result)
        }
        $("#painel").val(result.signal)
      });
    })
  })
};
