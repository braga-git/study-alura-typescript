interface Item {
  id: string;
  nome: string;
}

const formularioItem = document.getElementById('formularioItem') as HTMLFormElement;
const listaItens = document.getElementById('listaItens') as HTMLUListElement;
const inputItem = document.getElementById('item') as HTMLInputElement;

// Carregando itens do localStorage
// Tipagem de retorno Item[]: A função tem um tipo de retorno explícito Item[], que indica que essa função retornará um array de objetos do tipo Item.
const carregarItens = (): Item[] => {
  const itens = localStorage.getItem('itens');
  return itens ? JSON.parse(itens) : [];
};

// Salvando itens no localStorage
const salvarItensImplicita = (itens: Item[]) => {
  localStorage.setItem('itens', JSON.stringify(itens));
};

// Salvando itens no localStorage
// O tipo void em TypeScript é utilizado para representar a ausência de um valor. Quando dizemos que uma função é do tipo void, estamos afirmando que essa função não retorna nenhum valor.
const salvarItensExplicita = (itens: Item[]): void => {
  localStorage.setItem('itens', JSON.stringify(itens));
};

// Adicionando um novo item
const adicionarItem = (nome: string) => {
  const itens = carregarItens();
  const novoItem: Item = {
    id: new Date().toISOString(),
    nome
  };
  itens.push(novoItem);
  salvarItensExplicita(itens);
};

// Removendo um item pelo ID
const removerItem = (id: string) => {
  const itens = carregarItens();
  const itensAtualizados = itens.filter(item => item.id !== id);
  salvarItensExplicita(itensAtualizados);
};

// Editando um item pelo ID
// // código do artigo:
// const editarItem = (id: string, novoNome: string) => {
//   const itens = carregarItens();
//   const item = itens.find(item => item.id === id);
//   if (item) {
//     item.nome = novoNome;
//     salvarItens(itens);
//   }
// };

// meu código:
const editarItem = (id: string, novoNome: string) => {
  const itens = carregarItens();
  const item = itens.find(item => item.id === id);
  if (item && novoNome !== '') {
    removerItem(item.id)
  } else {
    item.nome = novoNome;
    salvarItensExplicita(itens);
  }
};

// Renderizando a lista de itens
const renderizarItens = () => {
  const itens = carregarItens();
  listaItens.innerHTML = '';
  itens.forEach(item => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = item.nome;
    listaItens.appendChild(listItem);

    // Adicionando eventos para editar e remover o item
    // // código do artigo:
    // listItem.addEventListener('dblclick', () => {
    //   const novoNome = prompt('Editar item:', item.nome);
    //   if (novoNome !== null) editarItem(item.id, novoNome);
    //   renderizarItens();
    // });

    // meu código:
    listItem.addEventListener('dblclick', () => {
      const novoNome = prompt('Editar item:', item.nome);
      editarItem(item.id, novoNome);
      renderizarItens();
    });
  });
};

// Inicializando a aplicação
formularioItem.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = inputItem.value.trim();
  if (nome) {
    adicionarItem(nome);
    inputItem.value = '';
    renderizarItens();
  }
});

// Renderizando itens ao carregar a página
renderizarItens();