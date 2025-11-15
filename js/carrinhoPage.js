import {navegarPara} from "./routesManager.js";

export function carrinhoPage() {

    // const carrinho = {
    //     'id': 1,
    //     'clienteid': 1,
    //     'datacriacao': '12/10/2005',
    //     'items': [
    //         {
    //             'id': 1,
    //             'produto': {
    //                 'id': 1,
    //                 'categoria': 'Camisetas',
    //                 'preco': 12.23,
    //                 'nome': 'Camisa',
    //                 'cor': 'Branca',
    //                 'imageurl': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    //             },
    //             'quantidade': 1,
    //         },
    //         {
    //             'id': 2,
    //             'produto': {
    //                 'id': 2,
    //                 'categoria': 'Casacos',
    //                 'preco': 123.23,
    //                 'nome': 'Casaco',
    //                 'cor': 'Vermelho',
    //                 'imageurl': 'https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    //             },
    //             'quantidade': 2,
    //         },
    //         {
    //             'id': 3,
    //             'produto': {
    //                 'id': 3,
    //                 'categoria': 'Camisetas',
    //                 'preco': 24.23,
    //                 'nome': 'Camisa',
    //                 'cor': 'Bege',
    //                 'imageurl': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    //             },
    //             'quantidade': 4,
    //         }
    //     ]
    // }

    const htmlContent = `
        <div class="container mt-5">
            <h1 class="mb-4">Meu Carrinho</h1>
            <div class="divisor"></div>
            <div class="row">
                <div id="carrinhoItems" class="col-6">
                    
                </div>
                <div class="col-6 card compra-card">
                    <div class="card-body d-flex flex-column">
                        <div class="row">
                            <h1>Método de pagamento</h1>
                            <select class="metodo form-select ms-3 mt-3" id="categoria">
                                <option selected>Método</option>
                                <option value="1">PIX</option>
                                <option value="2">Cartão de Crédito</option>
                                <option value="3">Cartão de Débito</option>
                            </select>
                        </div>
                        <div class="row mt-auto mb-2 align-items-center">
                            <h5 class="col-9">Valor final: R$ <span id="total"></span></h5>
                            <button onclick="comprar()" class="col-3 btn btn-primary">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#root').html(htmlContent)
    construirCarrinho();
}

function comprar() {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('Você precisa estar logado para comprar!')
        navegarPara('/login')
    }
}

function construirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    let carrinhoHtml = ``;
    let total = 0;
    carrinho['items'].forEach(item => {
        total += item.quantidade * item.produto.preco;
    });
    atualizarValorTotal(total);
    $('#total').html(total.toFixed(2));

    carrinho['items'].forEach((item, index) => {
        carrinhoHtml += `
            <div>
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 d-flex flex-column">
                                <div class="row">
                                    <h5 class="card-title">${item.produto.nome}</h5>
                                    <p class="card-text mt-2">Subtotal: R$ ${item.produto.preco * item.quantidade}</p>
                                </div>
                                <div class="row w-50 mt-auto">
                                    <div class="btn-group my-3 p-0" role="group" aria-label="Basic example">
                                        <button onclick="diminuirQuantidade(${index})" type="button" class="btn btn-primary">-</button>
                                        <p class="btn btn-toolbar justify-content-center">${item.quantidade}</p>
                                        <button onclick="aumentarQuantidade(${index})" type="button" class="btn btn-primary">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 text-end">
                                <img class="carrinho-img" src=${item.produto.imagemUri} alt=${item.produto.categoria}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    $('#carrinhoItems').html(carrinhoHtml);
}

function removerProduto(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.items.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    construirCarrinho();
}

function atualizarValorTotal(valorTotal = 0) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.valorTotal = valorTotal
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function aumentarQuantidade(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.items[index].quantidade += 1;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    construirCarrinho();
}

function diminuirQuantidade(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    if (carrinho.items[index].quantidade > 1) {
        carrinho.items[index].quantidade -= 1;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        construirCarrinho();
    } else {
        if (confirm('Deseja remover este item?')) {
            removerProduto(index);
        }
    }
}

window.removerProduto = removerProduto;
window.aumentarQuantidade = aumentarQuantidade;
window.diminuirQuantidade = diminuirQuantidade;
window.comprar = comprar;
