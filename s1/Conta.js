// s1/Conta.js — v4: abstrata e com tarifa
export class Conta {
  #saldo = 0;
  #titular;

  constructor(numero, titular) {
    if (new.target === Conta) {
      throw new Error("Conta é abstrata: crie ContaCorrente ou ContaPoupanca");
    }
    this.numero = numero;
    this.titular = titular;
  }

  get saldo() {
    return this.#saldo;
  }

  get titular() {
    return this.#titular;
  }

  set titular(nome) {
    if (typeof nome !== "string" || nome.trim().length < 3) {
      throw new Error("Titular inválido");
    }
    this.#titular = nome.trim();
  }

  saldoDisponivel() {
    return this.#saldo;
  }

  depositar(valor) {
    if (!(valor > 0)) throw new Error("Depósito deve ser positivo");
    this.#saldo += valor;
  }

  sacar(valor) {
    if (!(valor > 0)) throw new Error("Saque deve ser positivo");
    if (valor > this.saldoDisponivel()) throw new Error("Saldo insuficiente");
    this.#saldo -= valor;
  }

  // "método abstrato": cada tipo de conta TEM de dizer quanto cobra
  tarifaMensal() {
    throw new Error("tarifaMensal() precisa ser implementado na subclasse");
  }

  // sobrescrevendo um método que veio de Object.prototype
  toString() {
    return `${this.constructor.name} ${this.numero} · ${this.titular} · R$ ${this.saldo.toFixed(2)}`;
  }
}
