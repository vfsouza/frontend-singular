import {navegarPara} from "./routesManager.js";

export function loginPage() {
    return `
        <div class="container mt-5">
            <h1>Login</h1>
            <form>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Senha</label>
                    <input type="password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary submit">Entrar</button>
            </form>
        </div>
    `;
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