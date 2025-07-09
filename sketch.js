let jardineiro;
let plantas = [];
let temperatura = 20;
let totalArvores = 0;

class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 3;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }

    // Mantém dentro da tela
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  mostrar() {
    fill(0, 200, 0);
    ellipse(this.x, this.y, 30, 30); // Representação do jardineiro
  }
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mostrar() {
    fill(34, 139, 34);
    rect(this.x, this.y, 10, 30); // Tronco
    fill(0, 255, 0);
    ellipse(this.x + 5, this.y, 30, 30); // Copa
  }
}

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  let corFundo = lerpColor(
    color(139, 69, 19),
    color(205, 133, 63),
    map(totalArvores, 0, 100, 0, 1)
  );
  background(corFundo);

  mostrarInformacoes();

  temperatura += 0.3;

  jardineiro.atualizar();
  jardineiro.mostrar();

  plantas.forEach((arvore) => arvore.mostrar());

  verificarFimDeJogo();
}

function mostrarInformacoes() {
  textSize(26);
  fill(0);
  text("Vamos plantar árvores para reduzir a temperatura?", 10, 30);

  textSize(14);
  fill('white');
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Árvores plantadas: " + totalArvores, 460, 390);
  text("Para movimentar o personagem use as setas do teclado.", 10, 60);
  text("Para plantar árvores use P ou espaço.", 10, 80);
  text("Para reiniciar o jogo pressione R.", 10, 100);
}

function verificarFimDeJogo() {
  if (totalArvores > temperatura) {
    mostrarMensagemDeVitoria();
  } else if (temperatura > 50) {
    mostrarMensagemDeDerrota();
  }
}

function mostrarMensagemDeVitoria() {
  fill('green');
  textSize(32);
  text("Parabéns! Você venceu!", 150, height / 2);
  noLoop();
}

function mostrarMensagemDeDerrota() {
  fill('red');
  textSize(32);
  text("Aquecimento Global! Você perdeu!", 100, height / 2);
  noLoop();
}

function keyPressed() {
  if (key === 'p' || key === 'P' || key === ' ') {
    let arvore = new Arvore(jardineiro.x, jardineiro.y);
    plantas.push(arvore);
    totalArvores++;
    temperatura -= 3;
    if (temperatura < 0) temperatura = 0;
  }

  if (key === 'r' || key === 'R') {
    reiniciarJogo();
  }
}

function reiniciarJogo() {
  plantas = [];
  temperatura = 20;
  totalArvores = 0;
  jardineiro = new Jardineiro(width / 2, height - 50);
  loop(); // Reinicia o draw() se foi parado com noLoop()
}
