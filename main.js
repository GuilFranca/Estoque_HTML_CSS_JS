// início modal
let btnCadastro = document.querySelector('.controle__btn_cadastro_produto');
let modal = document.getElementById('modal');
let cancelarCadastro = document.getElementById('cancelar');

btnCadastro.onclick = function() {
    modal.showModal();
}

cancelarCadastro.onclick = function() {
    modal.close();
}
// Fim modal

// Listas

let produtos = [
    {nome: 'Moedor de Carne', qtd: 1},
]

