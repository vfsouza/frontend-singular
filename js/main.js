import { iniciarRouter } from './routesManager.js';

let logado = false;

$(document).ready(function() {
    iniciarRouter();
    verificarUsuarioLogado();
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