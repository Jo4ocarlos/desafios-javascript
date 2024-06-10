// Selecionar elementos
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicationInput = document.querySelector("#multiplicator");
const multiplicationTitle = document.querySelector("#multiplication-title span");
const fatherTable = document.querySelector("#multiplication-operations");
const cleanBtn = document.querySelector(".clean_btn");

// Funções 

// Função responsável por fazer as operações e gerar o resultado
const operation = (multiplication, multiplicator) => {
    // Limpar a tabela existente
    fatherTable.innerHTML = "";

    for (let i = 0; i <= multiplicator; i++) {
        const resultado = multiplication * i;
        const resultText = `${multiplication} x ${i} = ${resultado}`;
        createTable(resultText);
    }
};

// Função responsável por criar tabela e apresentar o resultado
const createTable = result => {
    const divTable = document.createElement("div");
    divTable.classList.add("row");
    divTable.textContent = result;
    fatherTable.appendChild(divTable);
};

// Eventos

// Evento responsável por fazer as validações e chamar a função 
multiplicationForm.addEventListener("submit", event => {
    event.preventDefault();

    const multiplicationNumber = Number(numberInput.value);
    const multiplicatorNumber = Number(multiplicationInput.value);

    if (multiplicatorNumber < 0 || multiplicatorNumber > 100) {
        alert("Digite um número de 0 a 100");
        return;
    }

    if (!multiplicationNumber || !multiplicatorNumber) {
        alert("Por favor, digite um número");
    } else {
        operation(multiplicationNumber, multiplicatorNumber);
        multiplicationTitle.textContent = `${multiplicationNumber}`;

        // Limpar os campos de entrada
        numberInput.value = "";
        multiplicationInput.value = "";
    }
});

// Responsável por limpar a tabuada
cleanBtn.addEventListener("click", event => {
    event.preventDefault();

    // Limpar os campos e tabuada atual
    numberInput.value = "";
    multiplicationInput.value = "";
    fatherTable.innerHTML = "Informe um número para calcular uma tabuada...";
    multiplicationTitle.textContent = "";
});






