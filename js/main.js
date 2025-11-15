import { iniciarRouter } from './routesManager.js';

let logado = false;

$(document).ready(function() {
    iniciarRouter();
    verificarUsuarioLogado();
    if (localStorage.getItem('carrinho') === null) { {
        let carrinho = {
            'clienteId': localStorage.getItem('usuarioLogado')?.id ?? 0,
            'valorTotal': localStorage.getItem('carrinho')?.valorTotal ?? 0,
            'dataCriacao': Date.now(),
            'items': []
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }}
});

export function verificarUsuarioLogado() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        $('.logado').show();
        $('.deslogado').hide();
    } else {
        $('.logado').hide();
        $('.deslogado').show();
    }
}

$('#root').conten