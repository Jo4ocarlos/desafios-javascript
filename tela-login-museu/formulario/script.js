const addressArea = document.querySelector(".address-area");
const zipCodeInput = document.querySelector("#cep");
const cityInput = document.querySelector("#cidade");
const streetInput = document.querySelector("#rua");
const stateInput = document.querySelector("#estado");
const neighborhoodInput = document.querySelector("#bairro");
const formInputs = document.querySelectorAll("[data-input]");

// Validação de números ao pressionar tecla
zipCodeInput.addEventListener("keypress", function (event) {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(event.keyCode);
  
    if (!onlyNumbers.test(key)) {
      event.preventDefault();
      return;
    }
  });
// Autocompletar os campos de endereço ao sair do campo CEP
zipCodeInput.addEventListener("input", function () {
    const zipCode = zipCodeInput.value
    if (zipCode.length === 8) {
        fetchAndFillAddress(zipCode);
    } 
  });

// Função para consultar a API do ViaCEP e preencher os campos
async function fetchAndFillAddress(zipCode) {
  const url = `https://viacep.com.br/ws/${zipCode}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.erro) {
      // Se a API retornar um erro, exiba o alerta
      showInvalidZipCodeAlert();
      clearAddressFields()
      return;

    } else {
      // Preencha os campos de endereço com os dados da API
      cityInput.value = data.localidade;
      streetInput.value = data.logradouro;
      stateInput.value = data.uf;
      neighborhoodInput.value = data.bairro;
      console.log(data)
    }
  } catch (error) {
    console.error("Erro ao buscar dados do CEP:", error);
  }
}

// Função para limpar os campos de endereço
function clearAddressFields() {
    cityInput.value = "";
    streetInput.value = "";
    stateInput.value = "Estado";
    neighborhoodInput.value = "";
  }
  
  // Função para exibir um alerta de CEP inválido
  function showInvalidZipCodeAlert() {
    alert("Digite um CEP válido.");
  }


// Limpar campos de endereço quando o usuário limpar o input CEP 
zipCodeInput.addEventListener("input", function () {
  if (zipCodeInput.value.length === 0) {
    clearAddressFields();
  }
});


// componentes do modal
const closeModal = document.querySelector(".close");
const modalArea = document.querySelector(".modal-area");

// Função para fechar o modal
const fecharModal = () => {
    modalArea.classList.add("hide");
};

// Adicionando evento de clique no botão de fechar
closeModal.addEventListener("click", () => {
    fecharModal();
});

// Fechar o modal após 11 segundos
setTimeout(fecharModal, 11000);