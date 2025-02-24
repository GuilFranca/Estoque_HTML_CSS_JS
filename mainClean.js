// Seleção de elementos do DOM
const btnCadastro = document.querySelector('.controle__btn_cadastro_produto');
const modal = document.getElementById('modal');
const cancelarCadastro = document.getElementById('cancelar_cadastro');
const btnCadastrar = document.getElementById('cadastrar');
const modalEdicao = document.getElementById('modal_edicao');
const cancelarEdicao = document.getElementById('cancelar_edicao');
const salvaEdicao = document.getElementById('salvar');
const telaProdutos = document.querySelector('.tela_produtos__card');

// Funções para abrir e fechar modais
function abrirModal(modal) {
    modal.showModal();
}

function fecharModal(modal) {
    modal.close();
}

// Eventos para abrir e fechar o modal de cadastro
btnCadastro.onclick = () => abrirModal(modal);
cancelarCadastro.onclick = () => fecharModal(modal);

// Cadastro de produtos
btnCadastrar.addEventListener("click", () => {
    const nomeProduto = document.getElementById('nome').value.trim();
    const qtdProduto = document.getElementById('qtd').value.trim();

    if (nomeProduto && qtdProduto) {
        const novoProduto = criarCardProduto(nomeProduto, qtdProduto);
        telaProdutos.appendChild(novoProduto);
        fecharModal(modal);
        document.getElementById('nome').value = '';
        document.getElementById('qtd').value = '';
    }
});

// Função para criar um card de produto
function criarCardProduto(nome, qtd) {
    const card = document.createElement('div');
    card.className = 'card__produto';
    card.innerHTML = `
        <div class="card__descricao">
            <h1 class="descricao__nome"><span class="descricao__span">Nome:</span> ${nome}</h1>
            <p class="descricao__qtd"><span class="descricao__span">Qtd:</span> ${qtd}</p>
        </div>
        <div class="card__botoes">
            <button class="tela_produtos__btn_add">+</button>
            <button class="tela_produtos__btn_remove">-</button>
            <button class="tela_produtos__btn_clean">X</button>
        </div>
    `;
    return card;
}

// Edição de produtos
telaProdutos.addEventListener("click", (event) => {
    const btnEdicao = event.target.closest('.tela_produtos__btn_edit');
    if (btnEdicao) {
        const cardProduto = btnEdicao.closest('.card__produto');
        const nomeProduto = cardProduto.querySelector('.descricao__nome').innerText.split(': ')[1];
        const qtdProduto = cardProduto.querySelector('.descricao__qtd').innerText.split(': ')[1];

        document.getElementById('nome_edicao').value = nomeProduto;
        document.getElementById('qtd_edicao').value = qtdProduto;
        abrirModal(modalEdicao);

        salvaEdicao.onclick = () => {
            cardProduto.querySelector('.descricao__nome').innerText = `Nome: ${document.getElementById('nome_edicao').value}`;
            cardProduto.querySelector('.descricao__qtd').innerText = `Qtd: ${document.getElementById('qtd_edicao').value}`;
            fecharModal(modalEdicao);
        };
    }
});

// Evento para cancelar edição
cancelarEdicao.onclick = () => fecharModal(modalEdicao);

// Entrada e saída de produtos
telaProdutos.addEventListener("click", (event) => {
    const cardProduto = event.target.closest('.card__produto');
    if (!cardProduto) return;

    const qtdProduto = cardProduto.querySelector('.descricao__qtd');
    let qtdAtual = parseInt(qtdProduto.innerText.split(': ')[1]);

    if (event.target.classList.contains('tela_produtos__btn_add')) {
        qtdAtual += 1;
    } else if (event.target.classList.contains('tela_produtos__btn_remove')) {
        qtdAtual = Math.max(qtdAtual - 1, 0); // Garante que a quantidade não seja negativa
    }

    qtdProduto.innerHTML = `<span class="descricao__span">Qtd:</span> ${qtdAtual}`;
});

// Remoção de produtos
telaProdutos.addEventListener("click", (event) => {
    if (event.target.classList.contains('tela_produtos__btn_clean')) {
        const cardProduto = event.target.closest('.card__produto');
        cardProduto.remove();
    }
});