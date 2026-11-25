import express from "express";
import categoriasRouter from "./routes/categorias.js";
import produtosRouter from "./routes/produtos.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// --- Middleware global (antes das rotas) ---
app.use(express.json());
app.use(logger);

// --- Health check ---
app.get("/", (req, res) => {
  res.json({
    api: "Loja API",
    versao: "1.0.0",
    rotas: ["/categorias", "/produtos"],
  });
});

// --- Rotas ---
app.use("/categorias", categoriasRouter);
app.use("/produtos", produtosRouter);

// --- 404 para rotas que não existem ---
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

// --- Tratador de erro: SEMPRE o último ---
app.use(errorHandler);

export default app;
