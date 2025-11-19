import { iniciarRouter } from './routesManager.js';

let logado = false;

$(document).ready(function() {
    iniciarRouter();
    verificarUsuarioLogado();

    const dataAtual = new Date().toISOString();

    if (localStorage.getItem('carrinho') === null) { {
        let carrinho = {
            'clienteId': localStorage.getItem('usuarioLogado')?.id ?? 0,
            'valorTotal': localStorage.getItem('carrinho')?.valorTotal ?? 0,
            'items': []
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }}
});

export function verificarUsuarioLogado() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    $('.admin').hide();

    if (usuarioLogado) {
        const usuarioAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));

        if (usuarioAdmin) {
            $('.admin').show();
        } else {
            $('.admin').hide();
        }

        $('.logado').show();
        $('.deslogado').hide();
    } else {
        $('.logado').hide();
        $('.deslogado').show();
    }


}

$('#root').conten