// ============================================================
// S2_library-bad.js — Mãos à Obra da Semana 2 (Parte A)
// Este código FUNCIONA (rode: node S2_library-bad.js). E é ruim de propósito.
// Sua tarefa, em dupla: NÃO refatore. Apenas leia e marque os cheiros.
//   Use // SMELL: <nome>        para cada code smell (nomes do slide 16)
//   Use // VIOLA: <S|O|L|I|D>   para cada princípio SOLID violado (slide 4)
// ============================================================

//Matheus william santos da nobrega
// DUPLA: Seu Nome e Nome do Colega
// DUPLA: Seu Nome e Nome do Colega
class Library {
  constructor() {
    // SMELL: Nome obscuro (bks, us e lns deveriam ser livros, usuarios e emprestimos)
    this.bks = [];
    this.us = [];
    this.lns = [];
  }

  // SMELL: Nome obscuro (doStuff não diz o que faz)
  // SMELL: Long Function (adiciona, empresta, devolve e checa atraso)
  // VIOLA: S
  doStuff(book, userId, action) {
    // SMELL: Switch sobre tipo (if/else if sobre "action")
    // VIOLA: O (para criar a ação "renovar" eu preciso abrir e alterar este método)
    if (action === "add") {
      this.bks.push(book);
      console.log("Added: " + book.t);
    } else if (action === "lend") {
      // SMELL: Duplicate Code (laço de busca de usuário; repete no 'overdue')
      var u = null;
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].id === userId) {
          u = this.us[i];
        }
      }

      var b = null;
      for (var j = 0; j < this.bks.length; j++) {
        if (this.bks[j].t === book.t) {
          b = this.bks[j];
        }
      }
      if (u != null && b != null && b.cp > 0) {
        b.cp = b.cp - 1;

        // SMELL: Magic Number (st: 1 não diz o que significa)
        // SMELL: Primitive Obsession (status guardado como número solto)
        this.lns.push({ uid: userId, bt: book.t, d: new Date(), st: 1 });

        // SMELL: Comentário-desodorante (existe porque o código não se explica)
        // 1 = active, 2 = returned, 3 = overdue

        // VIOLA: D (a regra de negócio chama o envio de e-mail direto, sem contrato)
        // SMELL: Erro engolido (o .catch(e => {}) está vazio)
        fetch("http://email.api/send", {
          method: "POST",
          body: JSON.stringify({ to: u.em, msg: "Você pegou " + book.t }),
        })
          .then((r) => {
            /* nada */
          })
          .catch((e) => {});
      }
    } else if (action === "return") {
      for (var k = 0; k < this.lns.length; k++) {
        if (
          this.lns[k].uid === userId &&
          this.lns[k].bt === book.t &&
          this.lns[k].st === 1
        ) {
          this.lns[k].st = 2;
          for (var m = 0; m < this.bks.length; m++) {
            if (this.bks[m].t === book.t) {
              this.bks[m].cp = this.bks[m].cp + 1;
            }
          }
        }
      }
    } else if (action === "overdue") {
      for (var n = 0; n < this.lns.length; n++) {
        var diff = (new Date() - this.lns[n].d) / (1000 * 60 * 60 * 24);
        // SMELL: Magic Number (o 7 dias e a conta 1000 * 60 * 60 * 24)
        if (this.lns[n].st === 1 && diff > 7) {
          this.lns[n].st = 3;
          var usr = null;
          for (var p = 0; p < this.us.length; p++) {
            if (this.us[p].id === this.lns[n].uid) {
              usr = this.us[p];
            }
          }
          if (usr) {
            // VIOLA: D
            fetch("http://email.api/send", {
              method: "POST",
              body: JSON.stringify({
                to: usr.em,
                msg: "Atrasado: " + this.lns[n].bt,
              }),
            });
          }
        }
      }
    }
  }

  // SMELL: Long Parameter List (8 parâmetros)
  // SMELL: Data Clumps (addr, cty, st e zp andam sempre juntos)
  registerUser(n, e, ph, addr, cty, st, zp, isAdm) {
    this.us.push({
      id: this.us.length + 1,
      n: n,
      em: e,
      ph: ph,
      addr: addr,
      cty: cty,
      st: st,
      zp: zp,
      isAdm: isAdm,
    });
  }

  // VIOLA: O (um relatório novo obriga a abrir e alterar este método)
  report(type) {
    if (type === 1) {
      console.log("Total de livros: " + this.bks.length);
    } else if (type === 2) {
      console.log("Total de usuários: " + this.us.length);
    } else if (type === 3) {
      console.log("Total de empréstimos: " + this.lns.length);
    }
  }
}

// Uso:
const lib = new Library();
lib.registerUser(
  "Ana",
  "ana@uepb.edu.br",
  "83999990000",
  "Rua X, 10",
  "Patos",
  "PB",
  "58700-000",
  false,
);
lib.doStuff({ t: "Clean Code", cp: 3 }, null, "add");
lib.doStuff({ t: "Clean Code" }, 1, "lend");
lib.report(1);
