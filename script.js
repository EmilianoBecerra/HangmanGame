const palabraSecretas = [
 "costos",
 "peron",
 "evita",
 "doctrina",
 "verdad",
 "realidad",
 "argentino",
 "argentina",
 "general",
 "capitana",
 "justicia",
 "igualdad", 
];


let palabraSecreta = palabraSecretas[Math.floor(Math.random() * palabraSecretas.length)];
let palabraOculta = "_".repeat(palabraSecreta.length).split("");
const letraIngresada = document.getElementById("letter");
const palabraPantalla = document.getElementById("word-display");
const formulario = document.getElementById("guess-form");
const btnReiniciar = document.getElementById("btn-reset");
const btnAdivinar = document.getElementById("btn_ready");
const mensaje = document.getElementById("message");
const letrasIntentadas = document.getElementById("letterAttempts");
let letrasUsadas = [];
let intentos = 0;
const body = ["head", "body", "pants", "footer"];
const efectoPerder = document.getElementById("skeleton");

palabraPantalla.textContent = palabraOculta.join(" ");

const actualizarPantalla = () => {
  letraIngresada.value = "";
  palabraPantalla.textContent = palabraOculta.join(" ");
  letrasIntentadas.textContent = letrasUsadas.join("-");
  mostrarGanaste();
  mostrarPerdiste();
}

const verificarLetra = () => {
  mensaje.textContent = "";
  const letra = letraIngresada.value.toLowerCase();
  if (!/^[a-z]$/i.test(letra)) {
    mensaje.textContent = "Por favor, ingresa una letra válida";
    return null;
  }
  if (letrasUsadas.includes(letra)) {
    mensaje.style.color = "black";
    mensaje.textContent = "Esa letra ya fue elegida";
    return null;
  }
  letrasUsadas.push(letra);
  if (!palabraSecreta.includes(letra)) {
    intentos++;
    const parteDelCuerpo = document.getElementById(body[intentos - 1]);
    parteDelCuerpo.style.display = "block";
  }
  return letra;
}

const adivinarLetra = () => {
  const letra = verificarLetra();
    for(let i = 0; i < palabraSecreta.length; i++){
      if(letra == palabraSecreta[i]){
        palabraOculta[i] = letra;
      }
    }
  actualizarPantalla();
}

const mostrarGanaste = () => {
  if(!palabraOculta.includes("_") && intentos < 4){
    mensaje.textContent = "Sos Peronista!!";
    mensaje.style.color = "lightblue";
    cambiarBotones();
  }
}

const mostrarPerdiste = () => {
  if(intentos == 4){
    mensaje.style.color = "red";
    mensaje.textContent = "Sos Radical";
    efectoPerder.classList.add("finish");
    cambiarBotones();
  }
}

const cambiarBotones = () => {
  btnAdivinar.classList.toggle("on");
  btnReiniciar.classList.toggle("on");
  letraIngresada.setAttribute("disabled", true);
}

const nuevaPalabraSecreta = () => {
  palabraSecreta = palabraSecretas[Math.floor(Math.random() * palabraSecretas.length)];
  palabraOculta = "_".repeat(palabraSecreta.length).split("");
}

const reiniciarPantalla = () => {
  if(intentos > 0){
    for(let i = 0; i < intentos; i++){
    const parteDelCuerpo = document.getElementById(body[i]);
    parteDelCuerpo.style.display = "none";
    }
    intentos = 0;
  }
  cambiarBotones();
  nuevaPalabraSecreta();
  letrasUsadas = [];
  efectoPerder.classList.remove("finish");
  mensaje.textContent = "";
  actualizarPantalla();
  letraIngresada.removeAttribute("disabled");
}

btnAdivinar.addEventListener("click", (e) => {
  e.preventDefault();
  adivinarLetra();
});

btnReiniciar.addEventListener("click", (e)=> {
  e.preventDefault();
  reiniciarPantalla();
})
