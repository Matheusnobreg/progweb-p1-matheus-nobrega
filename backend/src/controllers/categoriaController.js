import { categoriaService } from "../services/categoriaService.js";

export const categoriaController = {
  listar(req, res) {
    res.json(categoriaService.listar());
  },

  buscarPorId(req, res) {
    res.json(categoriaService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const nova = categoriaService.criar(req.body);
    res.status(201).json(nova);
  },

  atualizar(req, res) {
    res.json(categoriaService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    categoriaService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
