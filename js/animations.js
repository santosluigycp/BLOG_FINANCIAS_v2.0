// animations.js

// Função que inicializa as animações de scroll
export function initScrollAnimations() {
    console.log("1. Função de animação foi chamada!")
    // Seleciona todos os elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.fade-in-element');

    // Se não houver elementos para animar na página atual, não faz nada
    if (elementsToAnimate.length === 0) return;

    // Opções para o Intersection Observer:
    // threshold: 0.1 significa que o callback será chamado quando 10% do elemento estiver visível
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Cria o observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está visível na tela
            if (entry.isIntersecting) {
                console.log("2. Elemento está visível!", entry.target);
                // Adiciona a classe 'visible' para ativar a animação CSS
                entry.target.classList.add('visible');
                // Deixa de observar o elemento para não animar novamente (otimização)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Manda o observador "observar" cada um dos elementos selecionados
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}