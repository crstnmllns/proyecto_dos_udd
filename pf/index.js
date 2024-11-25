
const crearEncuesta = (titulo, preguntas) => ({
  titulo,
  preguntas: preguntas.map((pregunta, preguntaIndex) => ({
    id: preguntaIndex + 1,
    texto: pregunta.texto,
    opciones: pregunta.opciones.map((opcion, opcionIndex) => ({
      id: opcionIndex + 1,
      texto: opcion,
      votos: 0,
    })),
  })),
});

const votar = (encuesta, preguntaId, opcionId) => ({
  ...encuesta,
  preguntas: encuesta.preguntas.map((pregunta) =>
    pregunta.id === preguntaId
      ? {
          ...pregunta,
          opciones: pregunta.opciones.map((opcion) =>
            opcion.id === opcionId
              ? { ...opcion, votos: opcion.votos + 1 }
              : opcion
          ),
        }
      : pregunta
  ),
});

const mostrarResultados = (encuesta) => {
  console.log(`Resultados de la encuesta: "${encuesta.titulo}"`);
  encuesta.preguntas.forEach((pregunta) => {
    console.log(`- ${pregunta.texto}`);
    pregunta.opciones.forEach((opcion) => {
      console.log(`  ${opcion.id}. ${opcion.texto} - ${opcion.votos} votos`);
    });
  });
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

let encuesta = crearEncuesta("Encuesta de Opinión", datosPreguntas);

console.log("Encuesta creada:");
mostrarResultados(encuesta);

const realizarVotaciones = (encuesta, votos) =>
  votos.reduce(
    (encuestaActual, [preguntaId, opcionId]) =>
      votar(encuestaActual, preguntaId + 1, opcionId + 1),
    encuesta
  );

const votos = [
  [0, 2], // [pregunta,opcion]
  [1, 1], // [pregunta,opcion]
  [0, 0], // [pregunta,opcion]
  [2, 1], // [pregunta,opcion]
  [3, 1], // [pregunta,opcion]
  [4, 2], // [pregunta,opcion]
  [5, 2], // [pregunta,opcion]
  [6, 0], // [pregunta,opcion]
  [7, 2], // [pregunta,opcion]
];

encuesta = realizarVotaciones(encuesta, votos);

console.log("\nResultados actualizados:");
mostrarResultados(encuesta);
