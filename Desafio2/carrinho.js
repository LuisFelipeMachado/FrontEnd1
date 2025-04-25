let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nomeProduto, preco) {
    // Adicionar produto ao carrinho
    carrinho.push({ nome: nomeProduto, preco: preco });

    // Atualizar a lista do carrinho
    atualizarCarrinho();
}

function atualizarCarrinho() {
    // Limpar lista de produtos no carrinho
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';

    // Adicionar itens do carrinho à lista
    carrinho.forEach((produto, index) => {
        const item = document.createElement('li');
        item.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
        listaCarrinho.appendChild(item);
    });

    // Atualizar total
    total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio. Adicione produtos antes de finalizar.");
    } else {
        alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
        carrinho = []; // Limpar carrinho após finalização
        atualizarCarrinho(); // Atualizar exibição do carrinho
    }
}
