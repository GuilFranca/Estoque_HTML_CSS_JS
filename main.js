// início modal
const btnCadastro = document.querySelector('.controle__btn_cadastro_produto');
const modal = document.getElementById('modal');
const cancelarCadastro = document.getElementById('cancelar');

btnCadastro.onclick = function() {
    modal.showModal();
}

cancelarCadastro.onclick = function() {
    modal.close();
}
// Fim modal



// início cadastro de produtos
const btnCadastrar = document.getElementById('cadastrar');

btnCadastrar.addEventListener("click", function() {
    let nomeProduto = document.getElementById('nome').value;
    let qtdProduto = document.getElementById('qtd').value;

    const telaProdutos = document.querySelector('.tela_produtos__card');

    if(nomeProduto && qtdProduto) {
        telaProdutos.innerHTML = telaProdutos.innerHTML + `<div class="card__produto">
                    <div class="card__descricao">
                        <h1 class="descricao__nome"><span class="descricao__span">Nome:</span> ${nomeProduto}</h1>
                        <p class="descricao__qtd"><span class="descricao__span">Qtd:</span> ${qtdProduto}</p>
                        
                    </div>

                    <div class="card__botoes">
                        <button class="tela_produtos__btn_add">+</button>
                        <button class="tela_produtos__btn_remove">-</button>
                        <button class="tela_produtos__btn_clean">X</button>
                    </div>
                </div>`
        modal.close();
        // Apaga os valores dentro do input
        document.getElementById('nome').value = '';
        document.getElementById('qtd').value = '';
    }

})
// Fim cadastro de produtos



// início Entrada e saída
const btnsEntrada = document.querySelectorAll('.tela_produtos__btn_add');
const btnsSaida = document.querySelectorAll('.tela_produtos__btn_remove');
const btnsClean = document.querySelectorAll('.tela_produtos__btn_clean');

btnsEntrada.forEach(btnEntrada => {
    btnEntrada.addEventListener("click", function() {
        const cardProduto = btnEntrada.closest('.card__produto'); // Pega o card pai mais próximo
        const qtdProduto = cardProduto.querySelector('.descricao__qtd'); // Pega a qtd dentro desse card

        // Extrai apenas o número da quantidade e incrementa
        const qtdAtual = parseInt(qtdProduto.innerText.split(':')[1]);
        qtdProduto.innerHTML = `<span class="descricao__span">Qtd:</span> ${qtdAtual + 1}`;
    });
});

btnsSaida.forEach(btnSaida => {
    btnSaida.addEventListener("click", function() {
        const cardProduto = btnSaida.closest('.card__produto'); // Pega o card pai mais próximo
        const qtdProduto = cardProduto.querySelector('.descricao__qtd'); // Pega a qtd dentro desse card

        // Extrai apenas o número da quantidade e incrementa
        const qtdAtual = parseInt(qtdProduto.innerText.split(':')[1]);
        qtdProduto.innerHTML = `<span class="descricao__span">Qtd:</span> ${qtdAtual - 1}`;
    });
});
// fim Entrada e saída



// Clean/Apagar produtos
const telaProdutos = document.querySelector('.tela_produtos__card'); // Seleciona a div que contêm os cards de produtos
// Adiciona um ouvinte de evento de clique diretamente na div pai
// Isso se chama "event delegation" (delegação de evento)
// Assim, não importa se os elementos filhos foram adicionados depois, ele ainda consegue detectar o clique
telaProdutos.addEventListener("click", function(event) {
    // Verifica se o elemento clicado é o botão de apagar (com a classe .tela_produtos__btn_clean)
    if (event.target.classList.contains('tela_produtos__btn_clean')) {
        // Sobe na hierarquia do DOM até encontrar o elemento pai mais próximo com a classe .card__produto
        const cardProduto = event.target.closest('.card__produto');
        // Remove o elemento inteiro do DOM, apagando o card de produto
        cardProduto.remove();
    }
});



