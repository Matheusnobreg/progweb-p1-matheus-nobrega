let categorias = [];
let proximoId = 1;

export const categoriaModel = {
  listar() {
    return categorias;
  },

  buscarPorId(id) {
    return categorias.find((c) => c.id === id) ?? null;
  },

  existeNome(nome) {
    return categorias.some(
      (c) => c.nome.toLowerCase() === String(nome).toLowerCase(),
    );
  },

  inserir({ nome, descricao }) {
    const nova = { id: proximoId++, nome, descricao: descricao ?? null };
    categorias.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const i = categorias.findIndex((c) => c.id === id);
    if (i === -1) return null;
    categorias[i] = { ...categorias[i], ...dados, id };
    return categorias[i];
  },

  remover(id) {
    const antes = categorias.length;
    categorias = categorias.filter((c) => c.id !== id);
    return categorias.length < antes;
  },
};
