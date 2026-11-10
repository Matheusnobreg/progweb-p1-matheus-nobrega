// s1/ContaCorrente.js
import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {
  constructor(numero, titular, limite = 500) {
    this.limite = limite;
    super(numero, titular); // obrigatório ANTES de usar this
  }

  // sobrescrita: conta corrente pode entrar no limite
  saldoDisponivel() {
    return this.saldo + this.limite;
  }
}
