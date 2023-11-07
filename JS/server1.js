// Importação das bibliotecas necessárias
const express = require("express");
const cors = require("cors");
// Criação do servidor Express
const app = express();
// Definição da porta do servidor
const port = 3000;
// Configurações do Express
app.use(express.json());
// Configuração do CORS
app.use(cors());
// Criando um array de produtos
let produtos = [
    { id: 1, nome: "Produto A" },
    { id: 2, nome: "Produto B" },
    ];
    // Rota para listar todos os produtos
    app.get("/produtos", (req, res) => {
    console.log("get");
    // Retorna uma lista de produtos
    res.json(produtos);
    });
    // Rota para obter um produto por ID
    app.get("/produtos/:id", (req, res) => {
    // Obtém o ID do produto
    const id = parseInt(req.params.id);
    // Procura o produto no array
    const produto = produtos.find((produto) => produto.id === id);
    // Retorna o produto encontrado ou um erro
    if (produto) {
    res.json(produto);
    } else {
    res.status(404).json({ message: "Produto não encontrado" });
    }
    });
    // Rota para adicionar um novo produto
    app.post("/produtos", (req, res) => {
    // Obtém os dados do produto
    const newproduto = req.body;
    // Adiciona o produto ao array
    produtos.push(newproduto);
    // Retorna o novo produto
    res.status(201).json(newproduto);
    });
    // Rota para atualizar um produto
    app.put("/produtos/:id", (req, res) => {
    // Obtém o ID do produto
    const id = parseInt(req.params.id);
    // Obtém os dados do produto
    const updatedproduto = req.body;
    // Procura o produto no array
    const index = produtos.findIndex((produto) => produto.id === id);
    // Atualiza o produto encontrado ou retorna um erro
    if (index !== -1) {
    produtos[index] = { ...produtos[index], ...updatedproduto };
    res.json(produtos[index]);
    } else {
    res.status(404).json({ message: "Produto não encontrado" });
    }
    });
    
    // Rota para remover um produto
    app.delete("/produtos/:id", (req, res) => {
    // Obtém o ID do produto
    const id = parseInt(req.params.id);
    // Procura o produto no array
    const index = produtos.findIndex((produto) => produto.id === id);
    // Remove o produto encontrado ou retorna um erro
    if (index !== -1) {
    const removedproduto = produtos.splice(index, 1);
    res.json(removedproduto[0]);
    } else {
    res.status(404).json({ message: "Produto não encontrado" });
    }
    });
    // Inicia o servidor
    app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
    });