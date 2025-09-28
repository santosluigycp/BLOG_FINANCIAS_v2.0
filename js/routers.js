// router.js

// Importa a função de animação que criamos
import { initScrollAnimations } from './animations.js';

// Função para lidar com a navegação e evitar o recarregamento da página
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

// O roteador principal que lê a URL e carrega o conteúdo correto
const router = async () => {
    const routes = [
        { path: "/", view: "/pages/home.html" },
        { path: "/artigos", view: "/pages/artigos.html" },
        { path: "/ferramentas", view: "/pages/ferramentas.html" },
        { path: "/sobre", view: "/pages/sobre.html" },
    ];
    
    // Encontra a rota correspondente à URL atual
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    // Se nenhuma rota for encontrada, usa a rota 404
    if (!match) {
        match = {
            route: { path: "/404", view: "/pages/404.html" },
            isMatch: true
        };
    }

    // Busca o conteúdo HTML da rota encontrada
    const response = await fetch(match.route.view);
    const html = await response.text();

    // Injeta o HTML no elemento #app
    document.querySelector("#app").innerHTML = html;
    
    // CHAMA A FUNÇÃO DE ANIMAÇÃO APÓS CARREGAR O NOVO CONTEÚDO
    initScrollAnimations();
};

// Ouve o evento de popstate (quando o usuário usa os botões de voltar/avançar do navegador)
window.addEventListener("popstate", router);

// Ouve todos os cliques na página para interceptar cliques em links
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // Se o elemento clicado (ou seu pai) for um link com o atributo 'data-link'
        if (e.target.matches("[data-link]") || e.target.closest("[data-link]")) {
            e.preventDefault(); // Previne o comportamento padrão (recarregar a página)
            navigateTo(e.target.closest("[data-link]").href); // Navega para a URL do link
        }
    });

    // Roda o roteador na carga inicial da página
    router();
});