/**
 * Script de Controle do Portfólio Biográfico
 * Foco: Performance, manipulação limpa do DOM e persistência segura de estados.
 */
document.addEventListener("DOMContentLoaded", () => {
    
    /**
     * 1. Inicialização e Configuração do Dark Mode
     * Cria dinamicamente o botão flutuante e controla os estados via localStorage.
     */
    const initDarkMode = () => {
        const darkModeToggle = document.createElement("button");
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.classList.add("dark-mode-toggle");
        darkModeToggle.setAttribute("aria-label", "Alternar modo escuro");
        darkModeToggle.setAttribute("title", "Alternar tema de cores");
        document.body.appendChild(darkModeToggle);

        // Verifica o estado prévio salvo no browser de forma segura
        const isDark = localStorage.getItem("darkMode") === "true";
        if (isDark) {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Evento de clique para alternância de estado (Toggle)
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const activeDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", activeDark);
            
            // Altera o ícone de forma dinâmica e limpa baseada no estado ativo
            darkModeToggle.innerHTML = activeDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    };

    /**
     * 2. Animação de Scroll de Alta Performance (IntersectionObserver)
     * Entrega uma renderização sob demanda suave para as seções do portfólio.
     */
    const initScrollReveal = () => {
        const targetSections = document.querySelectorAll(".scroll-reveal");

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    // Deixa de observar o elemento após a animação executada para mitigar consumo de RAM
                    observer.unobserve(entry.target); 
                }
            });
        };

        const observerOptions = {
            threshold: 0.12, // Dispara a animação quando 12% da seção entra na viewport
            rootMargin: "0px 0px -40px 0px"
        };

        const scrollObserver = new IntersectionObserver(revealCallback, observerOptions);
        targetSections.forEach(section => scrollObserver.observe(section));
    };

    // Execução assíncrona controlada das rotinas do DOM
    initDarkMode();
    initScrollReveal();
});