let totalActual = 0;
let buffer = 0      ;
let operator;
const pantalla = document.querySelector('.pantalla');
const btn=document.querySelectorAll(".btn")

btn.forEach(function (button){
    button.addEventListener("click",function(event){
        buttonClick(event.target.innerText)

    })
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender()
}

function handleNumber(value){
    if (buffer === 0){
        buffer = value;
    } else {
        buffer += value;
    }
    rerender();
}

function handleSymbol(value){
    switch (value) {
        case 'C':
            totalActual=0;
            buffer=0;
            operator = null;
            rerender()
            return;
        case '←':
            if (buffer.toString().length === 1){
                buffer = 0;
            } else {
                buffer = parseInt(buffer.toString().substring(0, buffer.toString().length - 1))
            }
            rerender()
            break;
        case '÷':
        case 'X':
        case '+':
        case '-':
            handleMath(value);
            break;
        case '=':
            if (operator===null) {
                return;
            }
            realizaOperacion(parseInt(buffer));
            operator=null;
            buffer = totalActual;
            totalActual = 0;
            break;
    }
}

function handleMath(value) {
    if (parseInt(buffer)===0) {
        return;
    }
    const intBuffer = parseInt(buffer);
    if (totalActual===0){
        totalActual = intBuffer;
    } else {
        realizaOperacion(intBuffer)
    }

    operator=value;
    buffer =0;
    console.log(buffer)
}

function realizaOperacion(valor) {
    switch(operator){
        case '+':
            totalActual+=valor;
            return
        case '-':
            totalActual -= valor;
            return;
        case 'X':
            totalActual *= valor;
            return;
        case '÷':
            totalActual /= valor;
            return;
    }
}

function rerender(){
    pantalla.innerText=buffer;
}