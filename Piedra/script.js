let victoriasUsuario = 0;
let victoriasMaquina = 0;

while (victoriasUsuario < 3 && victoriasMaquina < 3) {

  let jugada = prompt("Elige: Piedra, Papel o Tijera");

  if (jugada === null) {
    alert("Juego cancelado por el usuario.");
    break;
  }

  jugada = jugada.trim().toLowerCase();

  if (jugada !== "piedra" && jugada !== "papel" && jugada !== "tijera") {
    alert("Opción no válida. Escribe Piedra, Papel o Tijera.");
    continue;
  }

  let azar = Math.random();
  let jugadaMaquina = "";
  let jugadaMaquina2 = "";

  if (azar < 0.33) {
    jugadaMaquina = "piedra";
  } else if (azar < 0.66) {
    jugadaMaquina = "papel";
  } else {
    jugadaMaquina = "tijera";
  }

  if (jugada === jugadaMaquina) {
    alert(`La máquina eligió: ${jugadaMaquina}\n\n¡Empate en esta ronda!\n\nMarcador actual:\nJugador: ${victoriasUsuario} | Máquina: ${victoriasMaquina}`);
  } else if (
    (jugada === "piedra" && jugadaMaquina === "tijera") ||
    (jugada === "papel" && jugadaMaquina === "piedra") ||
    (jugada === "tijera" && jugadaMaquina === "papel")
  ) {
    victoriasUsuario++;
    alert(`La máquina eligió: ${jugadaMaquina}\n\n¡Ganaste la ronda!\n\nMarcador actual:\nJugador: ${victoriasUsuario} | Máquina: ${victoriasMaquina}`);
  } else {
    victoriasMaquina++;
    alert(`La máquina eligió: ${jugadaMaquina}\n\nLa máquina gana la ronda.\n\nMarcador actual:\nJugador: ${victoriasUsuario} | Máquina: ${victoriasMaquina}`);
  }
}

if (victoriasUsuario === 3 || victoriasMaquina === 3) {
  const campeon = victoriasUsuario === 3 ? "¡FELICITACIONES, GANASTE EL TORNEO!" : "LA MÁQUINA HA GANADO EL TORNEO.";
  alert(`=== RESULTADO FINAL ===\n\n${campeon}\n\nMarcador final:\nJugador: ${victoriasUsuario} | Máquina: ${victoriasMaquina}`);
}