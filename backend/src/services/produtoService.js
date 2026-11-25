import { produtoModel } from "../models/produtoModel.js";
import { categoriaModel } from "../models/categoriaModel.js";
import { erro } from "../utils/erro.js";

export const produtoService = {
  listar(categoriaId) {
    if (categoriaId)
      return produtoModel.listarPorCategoria(Number(categoriaId));
    return produtoModel.listar();
  },

  buscarPorId(id) {
    const produto = produtoModel.buscarPorId(id);
    if (!produto) throw erro(404, "Produto não encontrado");
    return produto;
  },

  criar({ nome, preco, estoque, categoriaId } = {}) {
    // Regra 1: campos obrigatórios
    if (!nome || preco === undefined || !categoriaId) {
      throw erro(
        400,
        'Campos "nome", "preco" e "categoriaId" são obrigatórios',
      );
    }
    // Regra 2: preço precisa ser um número maior que 0
    if (Number.isNaN(Number(preco)) || Number(preco) <= 0) {
      throw erro(400, "O preço deve ser um número maior que 0");
    }
    // Regra 3: a categoria precisa existir
    if (!categoriaModel.buscarPorId(Number(categoriaId))) {
      throw erro(422, "Categoria informada não existe");
    }
    return produtoModel.inserir({ nome, preco, estoque, categoriaId });
  },

  atualizar(id, dados = {}) {
    const atualizado = produtoModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, "Produto não encontrado");
    return atualizado;
  },

  remover(id) {
    const removido = produtoModel.remover(id);
    if (!removido) throw erro(404, "Produto não encontrado");
  },
};
