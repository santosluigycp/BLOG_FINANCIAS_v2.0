document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona o botão do menu e a lista de links
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Adiciona um evento de clique no botão do menu
    menuToggle.addEventListener('click', function() {
        // Adiciona ou remove a classe 'active' da lista de links
        // O CSS cuida de mostrar ou esconder o menu com base nessa classe
        navLinks.classList.toggle('active');
    });

});