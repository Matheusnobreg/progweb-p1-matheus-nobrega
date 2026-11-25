let produtos = [];
let proximoId = 1;

export const produtoModel = {
  listar() {
    return produtos;
  },

  listarPorCategoria(categoriaId) {
    return produtos.filter((p) => p.categoriaId === categoriaId);
  },

  buscarPorId(id) {
    return produtos.find((p) => p.id === id) ?? null;
  },

  inserir({ nome, preco, estoque, categoriaId }) {
    const novo = {
      id: proximoId++,
      nome,
      preco: Number(preco),
      estoque: Number(estoque ?? 0),
      categoriaId: Number(categoriaId),
    };
    produtos.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = produtos.findIndex((p) => p.id === id);
    if (i === -1) return null;
    produtos[i] = { ...produtos[i], ...dados, id };
    return produtos[i];
  },

  remover(id) {
    const antes = produtos.length;
    produtos = produtos.filter((p) => p.id !== id);
    return produtos.length < antes;
  },
};
