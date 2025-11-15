import {navegarPara} from "./routesManager.js";

export function loginPage() {
    return `
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
                            <div class="modal-body">
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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                                <button onclick="criarConta()" type="button" class="btn btn-primary">Criar conta</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary submit">Entrar</button>
            </div>
        </div>
    `;
}

async function criarConta() {
    const nome = $('#criar-nome').val();
    const email = $('#criar-email').val();
    const senha = $('#criar-password').val();
    const senhaConf = $('#criar-password-conf').val();

    // Validações
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

    try {
        const response = await fetch('http://localhost:8080/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
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
    const response = await fetch(`http://localhost:8080/cliente/email/${emailCodificado}`)
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