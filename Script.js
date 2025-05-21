const produtos = {
    "Burgers Tradicionais": [
        { id: 1, nome: "Curti Duplo", preco: 26, descricao: "2 carnes, 2 queijos, 2 ovos, cebola, tomate e alface" },
        { id: 2, nome: "Curti Chicken", preco: 19, descricao: "Hambúrguer de frango, queijo, ovo, cebola, tomate e alface" },
        { id: 11, nome: "Curti X-Burger", preco: 8.5, descricao: "Carne, queijo e maionese" },
        { id: 12, nome: "Curti X-Salada", preco: 9.9, descricao: "Carne, queijo, cebola, tomate, alface e maionese" },
        { id: 13, nome: "Curti EGG-Burguer", preco: 14.0, descricao: "Carne, ovo, cheddar, tomate, cebola e alface" },
        { id: 14, nome: "Curti Bacon", preco: 18.0, descricao: "Carne, bacon, cheddar cremoso, cebola, tomate e alface" },
        { id: 15, nome: "Curti Tudo", preco: 18.0, descricao: "Carne, queijo cheddar, bacon, ovo, cebola, tomate e alface" }
    ],
    "Burgers Artesanais": [
        { id: 16, nome: "Curti Artesanal Cheddar", preco: 35, descricao: "Blend 150g, cheddar, bacon, cebola caramelizada e barbecue" },
        { id: 17, nome: "Curti Artesanal Chicken", preco: 28, descricao: "Blend frango, queijo, cebola caramelizada, tomate e alface" },
        { id: 18, nome: "Curti Artesanal 1.0", preco: 35, descricao: "Blend 150g, cebola caramelizada, picles, tomate e barbecue" },
        { id: 19, nome: "Curti Artesanal Coalho", preco: 38, descricao: "Blend 150g, queijo coalho, geleia de pimenta e tomate cereja" },
        { id: 20, nome: "Curti Artesanal Americano", preco: 45, descricao: "Blend 150g, provolone, mel, cebola caramelizada, bacon e barbecue" },
        { id: 21, nome: "Curti Artesanal Bacon", preco: 45, descricao: "Blend 150g, cheddar, bacon, molho cheddar, picles e tomate" },
        { id: 22, nome: "Curti Artesanal Supremo", preco: 45, descricao: "Blend 150g, geleia de pimenta, bacon, queijo empanado e molho especial" },
        { id: 23, nome: "Curti Artesanal 2.0", preco: 45, descricao: "Blend 150g, mussarela, cebola caramelizada, bacon empanado e barbecue" },
        { id: 24, nome: "Curti Artesanal Tropical", preco: 45, descricao: "Blend 150g, cheddar, bacon, queijo coalho, mel, banana da terra e molho especial" }
    ],
    "Combos": [
        { id: 5, nome: "Combo 1", preco: 32 },
        { id: 6, nome: "Combo 2", preco: 55 }
    ],
    "Porções": [
        { id: 7, nome: "Batata Frita P", preco: 12 },
        { id: 8, nome: "Batata Frita M", preco: 15 }
    ],
    "Bebidas": [
        { id: 9, nome: "Coca-cola Lata 350ml", preco: 6 },
        { id: 10, nome: "Guarana Lata 350ml", preco: 6 }
    ]
};

let carrinho = [];

function renderizarMenu() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";
    for (const [categoria, itens] of Object.entries(produtos)) {
        const secao = document.createElement("section");
        const titulo = document.createElement("h2");
        titulo.textContent = categoria;
        secao.appendChild(titulo);

        const grid = document.createElement("div");
        grid.className = "produtos";

        itens.forEach(item => {
            const card = document.createElement("div");
            card.className = "produto";
            card.innerHTML = `
                <strong>${item.nome}</strong><br>
                <small>${item.descricao || ""}</small><br>
                <span>R$ ${item.preco.toFixed(2)}</span><br>
                <button class="adicionar" onclick="adicionar(${item.id})">Adicionar (${contar(item.id)})</button>
                <br>
                <button class="remover" onclick="remover(${item.id})">Remover</button>
            `;
            grid.appendChild(card);
        });

        secao.appendChild(grid);
        menu.appendChild(secao);
    }
}

function adicionar(id) {
    const item = encontrarItem(id);
    carrinho.push(item);
    atualizarCarrinho();
}

function remover(id) {
    const index = carrinho.findIndex(item => item.id === id);
    if (index !== -1) {
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}

function contar(id) {
    return carrinho.filter(item => item.id === id).length;
}

function encontrarItem(id) {
    for (const itens of Object.values(produtos)) {
        const item = itens.find(p => p.id === id);
        if (item) return item;
    }
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById("itens-carrinho");
    itensCarrinho.innerHTML = "";

    const unicos = [...new Map(carrinho.map(item => [item.id, item])).values()];

    unicos.forEach(item => {
        const quantidade = contar(item.id);
        const div = document.createElement("div");
        div.textContent = `${quantidade}x ${item.nome} - R$ ${(item.preco * quantidade).toFixed(2)}`;
        itensCarrinho.appendChild(div);
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.getElementById("total").innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;

    renderizarMenu();
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

function atualizarPagamento() {
    const pagamento = document.getElementById("pagamento").value;
    document.getElementById("troco-container").style.display = pagamento === "Dinheiro" ? "block" : "none";
    document.getElementById("pix-container").style.display = pagamento === "Pix" ? "block" : "none";
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Adicione algum item ao carrinho.");
        return;
    }

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const obs = document.getElementById("obs").value;
    const pagamento = document.getElementById("pagamento").value;
    const troco = document.getElementById("troco").value;
    const semTroco = document.getElementById("sem-troco").checked;

    let msg = "🛒 *Pedido Curti Burger*\n\n";
    const unicos = [...new Map(carrinho.map(item => [item.id, item])).values()];

    unicos.forEach(item => {
        const quantidade = contar(item.id);
        msg += `🍔 ${quantidade}x ${item.nome} - R$ ${(item.preco * quantidade).toFixed(2)}\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    msg += `\n💰 *Total:* R$ ${total.toFixed(2)}`;
    msg += `\n💳 *Pagamento:* ${pagamento}`;

    if (pagamento === "Dinheiro") {
        msg += semTroco ? "\n💵 *Troco:* Não precisa de troco" : `\n💵 *Troco para:* R$ ${troco}`;
    }

    if (pagamento === "Pix") {
        msg += `\n🔑 *Chave PIX:* 21994796613\n📩 *Enviar comprovante pelo WhatsApp*`;
    }

    msg += `\n\n📦 *Informações do cliente:*`;
    msg += `\n👤 Nome: ${nome}`;
    msg += `\n🏠 Endereço: ${endereco}`;
    msg += `\n📞 Telefone: ${telefone}`;
    msg += `\n📝 Observações: ${obs}`;

    const url = `https://wa.me/5521994796613?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
}

renderizarMenu();
