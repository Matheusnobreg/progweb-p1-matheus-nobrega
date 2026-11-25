import { produtoService } from "../services/produtoService.js";

export const produtoController = {
  listar(req, res) {
    res.json(produtoService.listar(req.query.categoriaId));
  },

  buscarPorId(req, res) {
    res.json(produtoService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = produtoService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(produtoService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    produtoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
