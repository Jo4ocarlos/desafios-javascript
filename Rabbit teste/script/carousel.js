let currentIndexDesktop = 0;
let currentIndexMobile = 0;

function showSlide(index, type) {
    const slides = document.querySelectorAll(`.${type}-item`);
    const dots = document.querySelectorAll(`.${type} .dot`);

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${-index * 100}%)`;
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    if (type === 'desktop') {
        currentIndexDesktop = index;
    } else {
        currentIndexMobile = index;
    }
}

function moveSlide(direction, type) {
    if (type === 'desktop') {
        currentIndexDesktop += direction;
        showSlide(currentIndexDesktop, 'desktop');
    } else {
        currentIndexMobile += direction;
        showSlide(currentIndexMobile, 'mobile');
    }
}

function currentSlide(index, type) {
    showSlide(index, type);
}

// Inicializa o carrossel
showSlide(currentIndexDesktop, 'desktop');
showSlide(currentIndexMobile, 'mobile');

// Auto slide: Avança automaticamente a cada 5 segundos para cada carrossel
setInterval(() => {
    moveSlide(1, 'desktop'); // Avança para o próximo slide do desktop
}, 5000);
setInterval(() => {
    moveSlide(1, 'mobile'); // Avança para o próximo slide do mobile
}, 5000);
