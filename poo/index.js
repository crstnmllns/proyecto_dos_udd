
class Opcion {
  constructor(texto) {
    this.texto = texto;
    this.votos = 0;
  }

  votar() {
    this.votos++;
  }
}

class Pregunta {
  constructor(texto) {
    this.texto = texto;
    this.opciones = [];
  }

  agregarOpcion(opcion) {
    this.opciones.push(opcion);
  }

  mostrarResultados() {
    console.log(`Pregunta: ${this.texto}`);
    this.opciones.forEach((opcion, index) => {
      console.log(`  ${index + 1}. ${opcion.texto} - ${opcion.votos} votos`);
    });
  }
}

class Encuesta {
  constructor(titulo) {
    this.titulo = titulo;
    this.preguntas = [];
  }

  agregarPregunta(pregunta) {
    this.preguntas.push(pregunta);
  }

  votar(preguntaIndex, opcionIndex) {
    if (this.preguntas[preguntaIndex]) {
      const pregunta = this.preguntas[preguntaIndex];
      if (pregunta.opciones[opcionIndex]) {
        pregunta.opciones[opcionIndex].votar();
        console.log(
          `Tu voto fue registrado en la pregunta: "${pregunta.texto}", opción: "${pregunta.opciones[opcionIndex].texto}"`
        );
      } else {
        console.error("La opción seleccionada no es válida.");
      }
    } else {
      console.error("La pregunta seleccionada no es válida.");
    }
  }

  mostrarResultados() {
    console.log(`Resultados de la encuesta: ${this.titulo}`);
    this.preguntas.forEach((pregunta, index) => {
      console.log(`Pregunta ${index + 1}:`);
      pregunta.mostrarResultados();
    });
  }
}

const crearEncuesta = (titulo, datosPreguntas) => {
  const encuesta = new Encuesta(titulo);

  datosPreguntas.forEach((datoPregunta) => {
    const nuevaPregunta = new Pregunta(datoPregunta.texto);
    datoPregunta.opciones.forEach((opcionTexto) => {
      nuevaPregunta.agregarOpcion(new Opcion(opcionTexto));
    });
    encuesta.agregarPregunta(nuevaPregunta);
  });

  return encuesta;
};

const datosPreguntas = [
  {
    texto: "¿Cuál es tu lenguaje de programación favorito?",
    opciones: ["JavaScript", "Python", "Ruby"],
  },
  {
    texto: "¿Qué editor de código prefieres?",
    opciones: ["VS Code", "Sublime Text", "Atom"],
  },
  {
    texto: "¿Cuál es tu sistema operativo favorito?",
    opciones: ["Windows", "Linux", "macOS"],
  },
  {
    texto: "¿Qué navegador prefieres?",
    opciones: ["Chrome", "Firefox", "Safari"],
  },
  {
    texto: "¿Qué base de datos prefieres?",
    opciones: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    texto: "¿Prefieres trabajar de forma remota o presencial?",
    opciones: ["Remoto", "Presencial", "Híbrido"],
  },
  {
    texto: "¿Qué metodología de desarrollo prefieres?",
    opciones: ["Ágil", "Cascada", "Scrum"],
  },
  {
    texto: "¿Qué tipo de proyectos prefieres desarrollar?",
    opciones: ["Backend", "Frontend", "Fullstack"],
  },
];

const encuesta = crearEncuesta("Encuesta de Opinión", datosPreguntas);

console.log("Encuesta creada:");
encuesta.mostrarResultados();

const realizarVotaciones = (votos) => {
  votos.forEach(([preguntaIndex, opcionIndex]) => {
    encuesta.votar(preguntaIndex, opcionIndex);
  });
};

console.log("\nVotando...");
realizarVotaciones([
  [0, 0], // [pregunta,opcion]
  [1, 1], // [pregunta,opcion]
  [0, 2], // [pregunta,opcion]
  [2, 1], // [pregunta,opcion]
  [3, 0], // [pregunta,opcion]
  [4, 2], // [pregunta,opcion]
  [5, 1], // [pregunta,opcion]
  [6, 0], // [pregunta,opcion]
  [7, 2], // [pregunta,opcion]
]);

console.log("\nResultados actualizados:");
encuesta.mostrarResultados();
