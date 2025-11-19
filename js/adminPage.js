
const buttonTypes = ['Produtos', 'Clientes', 'Compras', 'CompraItems']

export function adminPage() {
    const rootHtml = `
        <div class="container mt-3">
            <h1>Admin Dashboard</h1>
            <div id="rootAdmin" class="">
                
            </div>
        </div>
    `;

    $('#root').html(rootHtml);
    carregarRootAdmin();
}

function carregarRootAdmin() {
    const buttonHtml = setDashboardsButtons()

    const rootAdminHtml = `
        <div class="row mt-5">
            <div class="d-flex justify-content-center gap-4">
                ${buttonHtml}
            </div>
        </div>    
    `

    $('#rootAdmin').html(rootAdminHtml);
    changeVisualization('Produtos');
}

function setDashboardsButtons() {

    let buttonHtml = '';

    buttonTypes.forEach(buttonType => {
        const buttonText = buttonType.toLowerCase();

        buttonHtml += `
            <div class="button-${buttonText}">
                <button onclick="changeVisualization('${buttonType}')" class="dashboard-btn btn btn-primary ${buttonText}">
                    ${buttonType}
                </button>
            </div>
        `
    })

    return buttonHtml;
}

function changeVisualization(buttonType) {
    // Remover active de todos os botões
    $('.dashboard-btn').removeClass('active');

    // Adicionar active apenas no botão clicado
    const buttonClass = buttonType.toLowerCase();
    $('.' + buttonClass).addClass('active');

    switch (buttonType) {
        case 'Produtos':
            break;
        case 'Clientes':
            break;
        case 'Compras':
            break;
        case 'CompraItems':
            break;
    }
}

window.changeVisualization = changeVisualization;
