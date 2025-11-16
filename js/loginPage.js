import {navegarPara} from "./routesManager.js";

export function loginPage() {
    $('#root').html(`
        <div class="container mt-5">
            <h1 class="row mb-4">Login</h1>
            <form class="row">
                <div class="mb-3 p-0">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control">
                </div>
                <div class="mb-3 p-0">
                    <label class="form-label">Senha</label>
                    <input type="password" class="form-control">
                </div>
            </form>
            <div class="d-flex">
                <button type="button" class="btn btn-secondary me-3" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever="@getbootstrap">Criar conta</button>
                <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered mx-auto">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel">New message</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body criar-cliente-modal-1">
                                <form>
                                    <div class="mb-3">
                                        <label for="criar-nome" class="col-form-label">Nome:</label>
                                        <input type="text" class="form-control" id="criar-nome" placeholder="João da Silva">
                                    </div>
                                    <div class="mb-3">
                                        <label for="criar-email" class="col-form-label">E-mail:</label>
                                        <input type="email" class="form-control" id="criar-email" placeholder="joao.silva@email.com">
                                    </div>
                                    <div class="mb-3">
                                        <label for="criar-password" class="col-form-label">Senha:</label>
                                        <input type="password" class="form-control" id="criar-password">
                                    </div>
                                    <div class="mb-3">
                                        <label for="criar-password-conf" class="col-form-label">Confirmar senha:</label>
                                        <input type="password" class="form-control" id="criar-password-conf">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-body criar-cliente-modal-2" style="display: none">
                                <form>
                                    <div class="row">
                                        <div class="col-4 mb-3">
                                            <label for="criar-cep" class="col-form-label">CEP:</label>
                                            <input onfocusout="consultarCep()" type="text" class="form-control" id="criar-cep" placeholder="12345678">
                                        </div>
                                        <div class="col-6 mb-3">
                                            <label for="criar-cidade" class="col-form-label">Cidade:</label>
                                            <input disabled type="text" class="form-control" id="criar-cidade">
                                        </div>
                                        <div class="col-2 mb-3">
                                            <label for="criar-estado" class="col-form-label">Estado:</label>
                                            <input disabled type="text" class="form-control" id="criar-estado">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <label for="criar-rua" class="col-form-label">Rua:</label>
                                            <input disabled type="text" class="form-control" id="criar-rua">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-4 mb-3">
                                            <label for="criar-numero" class="col-form-label">Número:</label>
                                            <input type="text" class="form-control" id="criar-numero">
                                        </div>
                                        <div class="col-8 mb-3">
                                            <label for="criar-complemento" class="col-form-label">Complemento:</label>
                                            <input type="text" class="form-control" id="criar-complemento">
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer gap-3">
                                <button id="btn-voltar" onclick="voltarModal()" type="button" class="btn btn-secondary">Voltar</button>
                                <button id="btn-proximo" onclick="proximoModal()" type="button" class="btn btn-primary">Próximo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary submit">Entrar</button>
            </div>
        </div>
    `);
}

async function consultarCep() {
    const cep = $('#criar-cep').val();

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = await response.json();

    console.log(endereco);

    $('#criar-cidade').val(endereco.localidade);
    $('#criar-estado').val(endereco.uf);
    $('#criar-rua').val(endereco.logradouro);
}

function voltarModal() {
    const modal1 = $('.criar-cliente-modal-1');
    const modal2 = $('.criar-cliente-modal-2');
    const btnVoltar = $('#btn-voltar');
    const btnProximo = $('#btn-proximo');

    if (modal2.is(':visible')) {
        modal2.hide();
        modal1.show();

        btnProximo.text('Próximo');

        btnVoltar.removeAttr('data-bs-dismiss');
    } else {
        btnVoltar.attr('data-bs-dismiss', 'modal');

        $('.btn-close').click();

        setTimeout(() => {
            resetarModal();
        }, 300);
    }
}

function resetarModal() {
    // Limpar campos
    $('#criar-nome, #criar-email, #criar-password, #criar-password-conf').val('');
    $('#criar-cep, #criar-rua, #criar-numero, #criar-complemento').val('');
    $('#criar-cidade, #criar-estado').val('');

    // Voltar para etapa 1
    $('.criar-cliente-modal-2').hide();
    $('.criar-cliente-modal-1').show();

    // Resetar UI
    $('#etapa-numero').text('1');
    $('#btn-proximo').text('Próximo');
}

function proximoModal() {
    const btnProximo = $('#btn-proximo');

    const nome = $('#criar-nome').val();
    const email = $('#criar-email').val();
    const senha = $('#criar-password').val();
    const senhaConf = $('#criar-password-conf').val();

    if (!nome || !email || !senha || !senhaConf) {
        alert('Preencha todos os campos!');
        return;
    }

    if (senha !== senhaConf) {
        alert('As senhas não coincidem!');
        return;
    }

    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres!');
        return;
    }

    if (btnProximo.text() === 'Cadastrar') {
        const cep = $('#criar-cep').val();
        const rua = $('#criar-rua').val();
        const numero = $('#criar-numero').val();
        const complemento = $('#criar-complemento').val();
        const cidade = $('#criar-cidade').val();
        const estado = $('#criar-estado').val();

        if (!cep || !rua || !numero || !complemento || !cidade || !estado) {
            alert('Preencha todos os campos!');
            return;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            endereco: {
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: numero,
                cidade: cidade,
                estado: estado,
                pais: 'Brasil'
            }
        }

        criarConta(usuario).then();
        return;
    }

    btnProximo.text('Cadastrar');
    $('.criar-cliente-modal-1').hide();
    $('.criar-cliente-modal-2').show();
}

async function criarConta(usuario) {
    try {
        const response = await fetch(`${window.APP_CONFIG.API_URL}/cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            if (response.status === 409) {
                alert('Este email já está cadastrado!');
            } else {
                const erro = await response.json();
                alert(erro.erro || 'Erro ao criar conta!');
            }
            return;
        }

        const cliente = await response.json();

        console.log('Conta criada:', cliente);
        alert('Conta criada com sucesso!');

        $('.modal-backdrop').remove();

        // Redirecionar para home
        navegarPara('/login');

    } catch (error) {
        console.error('Erro ao criar conta:', error);
        alert('Erro ao conectar com o servidor!');
    }
}

$(document).on('click', '.submit', async (e) => {
    e.preventDefault();

    const email = $('input[type="email"]').val();
    const senha = $('input[type="password"]').val();

    const emailCodificado = encodeURIComponent(email);
    const response = await fetch(`${window.APP_CONFIG.API_URL}/cliente/email/${emailCodificado}`)
    if (!response.ok) {
        if (response.status === 404) {
            alert('Email não encontrado!');
        } else {
            alert('Erro ao buscar cliente!');
        }
        return;
    }

    const cliente = await response.json();
    console.log('Cliente encontrado:');

    if (email === cliente.email && senha === cliente.senha) {
        const usuario = {
            id: cliente.id,
            email: email,
            senha: senha,
        };

        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        sessionStorage.setItem('isLoggedIn', 'true');
        console.log('Salvou no storage:', sessionStorage.getItem('usuarioLogado'));

        alert('Login realizado com sucesso!');
        navegarPara('/');
    } else {
        alert('Email ou senha incorretos!');
    }
});

window.criarConta = criarConta;
window.proximoModal = proximoModal;
window.consultarCep = consultarCep;
window.voltarModal = voltarModal;
window.resetarModal = resetarModal;