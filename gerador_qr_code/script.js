// Seleciona elementos do DOM
const generateInput = document.querySelector("#generate_input");
const generateButton = document.querySelector(".generate_button");
const qrImg = document.querySelector(".qr_image");

// Constante para a URL da API
const QR_API_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

// Função para gerar o QR Code
function gerarQr() {
    // Obtém o valor do input
    const inputContent = generateInput.value;

    // Remove a classe 'hover' da imagem QR
    qrImg.classList.remove("hover");

    // Verifica se o input está vazio
    if (!inputContent) {
        alert('Digite algo'); // Exibe um alerta se o input estiver vazio
        return; // Sai da função se o input estiver vazio
    }

    // Define a fonte da imagem QR com o conteúdo do input
    qrImg.src = `${QR_API_URL}${inputContent}`;
    generateInput.value = ""; // Limpa o valor do input
}

// Adiciona um evento de clique ao botão de gerar
generateButton.addEventListener("click", () => {
    gerarQr(); // Chama a função para gerar o QR Code
});

