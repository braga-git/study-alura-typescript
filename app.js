var formularioItem = document.getElementById('formularioItem');
var listaItens = document.getElementById('listaItens');
var inputItem = document.getElementById('item');
// Carregando itens do localStorage
// Tipagem de retorno Item[]: A função tem um tipo de retorno explícito Item[], que indica que essa função retornará um array de objetos do tipo Item.
var carregarItens = function () {
    var itens = localStorage.getItem('itens');
    return itens ? JSON.parse(itens) : [];
};
// Salvando itens no localStorage
var salvarItensImplicita = function (itens) {
    localStorage.setItem('itens', JSON.stringify(itens));
};
// Salvando itens no localStorage
// O tipo void em TypeScript é utilizado para representar a ausência de um valor. Quando dizemos que uma função é do tipo void, estamos afirmando que essa função não retorna nenhum valor.
var salvarItensExplicita = function (itens) {
    localStorage.setItem('itens', JSON.stringify(itens));
};
// Adicionando um novo item
var adicionarItem = function (nome) {
    var itens = carregarItens();
    var novoItem = {
        id: new Date().toISOString(),
        nome: nome
    };
    itens.push(novoItem);
    salvarItensExplicita(itens);
};
// Removendo um item pelo ID
var removerItem = function (id) {
    var itens = carregarItens();
    var itensAtualizados = itens.filter(function (item) { return item.id !== id; });
    salvarItensExplicita(itensAtualizados);
};
// Editando um item pelo ID
var editarItem = function (id, novoNome) {
    var itens = carregarItens();
    var item = itens.find(function (item) { return item.id === id; });
    if (item && novoNome !== '') {
        removerItem(item.id);
    }
    else {
        item.nome = novoNome;
        salvarItensExplicita(itens);
    }
};
// Renderizando a lista de itens
var renderizarItens = function () {
    var itens = carregarItens();
    listaItens.innerHTML = '';
    itens.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.nome;
        listaItens.appendChild(listItem);
        // Adicionando eventos para editar e remover o item
        listItem.addEventListener('dblclick', function () {
            var novoNome = prompt('Editar item:', item.nome);
            editarItem(item.id, novoNome);
            renderizarItens();
        });
    });
};
// Inicializando a aplicação
formularioItem.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = inputItem.value.trim();
    if (nome) {
        adicionarItem(nome);
        inputItem.value = '';
        renderizarItens();
    }
});
// Renderizando itens ao carregar a página
renderizarItens();
