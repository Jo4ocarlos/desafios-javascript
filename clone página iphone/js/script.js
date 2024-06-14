// Seleciona todos os botões de seleção de imagem
const buttons = document.querySelectorAll("#image-picker li");
// Seleciona a imagem do produto
const image = document.querySelector("#product-image");

// Adiciona um evento de clique a cada botão
buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        // Remove a classe 'selected' de todos os botões
        buttons.forEach((btn) => {
            btn.querySelector(".color").classList.remove("selected");
        });

        // Adiciona a classe 'selected' ao botão clicado
        const button = event.currentTarget;
        button.querySelector(".color").classList.add("selected");

        // Obtém o ID do botão clicado
        const id = button.getAttribute("id");
        console.log(id);

        // Adiciona a classe 'changing' à imagem para dar um efeito e muda o src
        image.classList.add("changing");
        image.setAttribute("src", `img/iphone_${id}.jpg`);

        // Remove a classe 'changing' após 300ms
        setTimeout(() => {
            image.classList.remove("changing");
        }, 300);
    });
});
