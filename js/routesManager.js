import {homePage} from "./homePage.js";
import {contaPage} from "./contaPage.js";
import {loginPage} from "./loginPage.js";
import {produtoPage} from "./produtoPage.js";
import {carrinhoPage} from "./carrinhoPage.js";
import {verificarUsuarioLogado} from "./main.js";

const rotas = {
    '/': {
        render: homePage,
        css: 'home-style'
    },
    '/conta': {
        render: contaPage,
        css: 'conta-style'
    },
    '/login': {
        render: loginPage,
        css: 'login-style'
    },
    '/produto': {
        render: produtoPage,
        css: 'produto-style'
    },
    '/carrinho': {
        render: carrinhoPage,
        css: 'carrinho-style'
    }
}

// Rotas que precisam de autenticação
const rotasProtegidas = ['/conta'];

// Variável para armazenar o CSS atual
let cssAtual = null;

/**
 * Verifica se o usuário está logado
 */
function verificarLogin() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        navegarPara('/login');
        return false;
    }

    return true;
}

/**
 * Gerencia o carregamento dinâmico de CSS por página
 * @param {string} arquivo - Nome do arquivo CSS (sem extensão)
 */
function carregarCSS(arquivo) {
    // Remover CSS anterior se existir e for diferente
    if (cssAtual && cssAtual !== arquivo) {
        const linkAntigo = document.getElementById(`page-css-${cssAtual}`);
        if (linkAntigo) {
            linkAntigo.remove();
            console.log(`CSS removido: ${cssAtual}`);
        }
    }

    // Carregar novo CSS se fornecido e diferente do atual
    if (arquivo && arquivo !== cssAtual) {
        // Verificar se já existe para evitar duplicação
        if (!document.getElementById(`page-css-${arquivo}`)) {
            const link = document.createElement('link');
            link.id = `page-css-${arquivo}`;
            link.rel = 'stylesheet';
            link.href = `css/pages/${arquivo}.css`;
            document.head.appendChild(link);
            console.log(`CSS carregado: ${arquivo}`);
        }
        cssAtual = arquivo;
    }
}

/**
 * Navega para uma URL específica
 * @param {string} url - URL de destino
 * @param {boolean} adicionarHistorico - Se deve adicionar ao histórico do navegador
 */
export function navegarPara(url = '/', adicionarHistorico = true) {
    // Verificar se a rota precisa de autenticação
    if (rotasProtegidas.includes(url) && !verificarLogin()) {
        alert('Você precisa fazer login para acessar esta página!');
        url = '/login';
    }

    // Pegar configuração da rota
    const rotaConfig = rotas[url] || rotas['/'];

    // Carregar CSS específico da página
    carregarCSS(rotaConfig.css);

    // Renderizar página
    $('#root').fadeOut(200, function() {
        $(this).html(rotaConfig.render()).fadeIn(200);
        verificarUsuarioLogado();
    });

    // Adicionar ao histórico se necessário
    if (adicionarHistorico) {
        window.history.pushState({}, '', url);
    }

    // Atualizar links ativos na navegação
    $('a[data-link]').removeClass('active');
    $(`a[data-link][href="${url}"]`).addClass('active');

    // Scroll para o topo
    window.scrollTo(0, 0);
}

/**
 * Inicializa o sistema de roteamento
 */
export function iniciarRouter() {
    // Interceptar cliques em links
    $(document).on('click', 'a[data-link]', function(e) {
        e.preventDefault();
        const url = $(this).attr('href');
        navegarPara(url);
    });

    // Detectar botão voltar/avançar do navegador
    $(window).on('popstate', function() {
        navegarPara(window.location.pathname, false);
    });

    // Renderizar página inicial
    navegarPara(window.location.pathname, false);
}

/**
 * Função para fazer login
 * @param {Object} usuario - Dados do usuário
 */
export function fazerLogin(usuario) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    sessionStorage.setItem('isLoggedIn', 'true');
    verificarUsuarioLogado();
    navegarPara('/');
}

/**
 * Função para fazer logout
 */
export function fazerLogout() {
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('carrinho'); // Limpar carrinho ao fazer logout
    verificarUsuarioLogado();
    navegarPara('/');
}