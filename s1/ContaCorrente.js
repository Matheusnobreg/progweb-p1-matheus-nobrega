// s1/ContaCorrente.js
import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {
  constructor(numero, titular, limite = 500) {
    super(numero, titular);
    this.limite = limite;
  }

  saldoDisponivel() {
    return this.saldo + this.limite;
  }

  tarifaMensal() {
    return 12.9;
  }
}
