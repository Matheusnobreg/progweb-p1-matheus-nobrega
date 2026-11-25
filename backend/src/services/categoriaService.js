import { categoriaModel } from "../models/categoriaModel.js";
import { erro } from "../utils/erro.js";

export const categoriaService = {
  listar() {
    return categoriaModel.listar();
  },

  buscarPorId(id) {
    const categoria = categoriaModel.buscarPorId(id);
    if (!categoria) throw erro(404, "Categoria não encontrada");
    return categoria;
  },

  criar({ nome, descricao } = {}) {
    if (!nome) throw erro(400, 'Campo "nome" é obrigatório');
    if (categoriaModel.existeNome(nome))
      throw erro(409, "Já existe uma categoria com este nome");
    return categoriaModel.inserir({ nome, descricao });
  },

  atualizar(id, dados = {}) {
    const atualizada = categoriaModel.atualizar(id, dados);
    if (!atualizada) throw erro(404, "Categoria não encontrada");
    return atualizada;
  },

  remover(id) {
    const removida = categoriaModel.remover(id);
    if (!removida) throw erro(404, "Categoria não encontrada");
  },
};
