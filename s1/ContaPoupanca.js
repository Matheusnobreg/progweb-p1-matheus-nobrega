// s1/ContaPoupanca.js
import { Conta } from "./Conta.js";

export class ContaPoupanca extends Conta {
  constructor(numero, titular, taxaMensal = 0.005) {
    super(numero, titular);
    this.taxaMensal = taxaMensal;
  }

  render() {
    const rendimento = this.saldo * this.taxaMensal;
    if (rendimento > 0) this.depositar(rendimento);
    return rendimento;
  }

  tarifaMensal() {
    return 0;
  }
}
