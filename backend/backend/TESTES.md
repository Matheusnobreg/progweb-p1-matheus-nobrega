# Testes da API — Projeto 1 (S3)

API: Loja · entidades: Categoria e Produto · servidor: `npm run dev` em http://localhost:3000

| #   | Método | URL                     | Body                                              | Status obtido | Observação           |
| --- | ------ | ----------------------- | ------------------------------------------------- | ------------- | -------------------- |
| 1   | POST   | /categorias             | {"nome":"Bebidas"}                                | 201           |                      |
| 2   | POST   | /produtos               | {"nome":"Água 500ml","preco":3.5,"categoriaId":1} | 201           |                      |
| 3   | GET    | /produtos?categoriaId=1 | —                                                 | 200           | filtro 1:N           |
| 4   | GET    | /produtos/99            | —                                                 | 404           |                      |
| 5   | POST   | /produtos               | {"nome":"X","preco":-1,"categoriaId":1}           | 400           | regra: preço > 0     |
| 6   | POST   | /produtos               | {"nome":"Y","preco":2,"categoriaId":999}          | 422           | categoria não existe |
| 7   | POST   | /categorias             | {"nome":"Bebidas"}                                | 409           | nome único           |
| 8   | DELETE | /categorias/1           | —                                                 | 204           |                      |
