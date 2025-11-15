export function homePage() {

    const htmlContent = `
        <div class="container mt-3">
            <h1>Bem-vindo à Singular!</h1>
            <div id="rootProdutos" class="d-grid gap-4 mt-5" style="grid-template-columns: repeat(4, 1fr)"></div>
        </div>
    `

    $('#root').html(htmlContent)

    construirProdutos().then(r => {return null});
}

async function construirProdutos() {
    const response = await fetch(`${window.APP_CONFIG.API_URL}/produto`);
    const produtos = await response.json();
    sessionStorage.setItem('produtos', JSON.stringify(produtos));

    console.log(produtos);

    let produtoHtml = '';
    produtos.forEach(produto => {
        produtoHtml += `
            <div>
                <div class="card mx-auto" style="width: 18rem;">
                    <img src="${produto.imagemUri}" class="card-img-top card-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text mt-3 mb-2">R$ ${produto.preco}</p>
                        <button onclick="adicionarCarrinho(${produto.id})" class="btn btn-primary">Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        `
    })

    $('#rootProdutos').html(produtoHtml);
}

function adicionarCarrinho(id) {
    const produtos = JSON.parse(sessionStorage.getItem('produtos'));
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert('Produto não encontrado!');
        return;
    }

    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // ✅ Verificar se produto já está no carrinho
    const itemExistente = carrinho.items.find(item => item.produto.id === produto.id);

    if (itemExistente) {
        // Aumentar quantidade
        itemExistente.quantidade += 1;
    } else {
        // Adicionar novo item
        carrinho.items.push({
            id: carrinho.items.length + 1,
            produto: produto,
            quantidade: 1
        });
    }

    // Salvar carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

window.adicionarCarrinho = adicionarCarrinho;