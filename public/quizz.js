document.addEventListener('DOMContentLoaded', () => {
    // Preguntas del quizz
    const preguntas = [
      { pregunta: "¿País con mayor población en 2024?", respuestas: ["India", "China", "España"], correcta: "India" },
      { pregunta: "¿Qué país recibe más habitantes por migración?", respuestas: ["Estados Unidos", "Alemania", "China"], correcta: "Estados Unidos" },
      { pregunta: "¿Color del cielo?", respuestas: ["Rojo", "Azul", "Verde"], correcta: "Azul" },
      { pregunta: "¿Capital de España?", respuestas: ["Madrid", "Barcelona", "Sevilla"], correcta: "Madrid" },
      { pregunta: "¿5 * 5?", respuestas: ["25", "20", "30"], correcta: "25" },
      { pregunta: "¿Planeta más grande?", respuestas: ["Tierra", "Júpiter", "Saturno"], correcta: "Júpiter" },
      { pregunta: "¿Primera letra del abecedario?", respuestas: ["A", "B", "C"], correcta: "A" },
      { pregunta: "¿Animal más rápido?", respuestas: ["Guepardo", "León", "Tigre"], correcta: "Guepardo" },
      { pregunta: "¿Número de continentes?", respuestas: ["5", "6", "7"], correcta: "7" },
      { pregunta: "¿Idioma más hablado?", respuestas: ["Inglés", "Chino", "Español"], correcta: "Chino" }
    ];
  
    // Variables
    let currentQuestionIndex = 0;
    let score = 0;
  
    // Referencias al DOM
    const dropZone = document.getElementById('dropZone');

    const answers = document.getElementById('answers');
    const questionElement = document.getElementById('question');
    const feedback = document.getElementById('feedback');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const scoreElement = document.getElementById('score');
  
    // Mostrar la pregunta y respuestas
    function loadQuestion() {
      const currentQuestion = preguntas[currentQuestionIndex];
      questionElement.textContent = `${currentQuestion.pregunta}`;
      dropZone.innerHTML = "Arrastra la respuesta aquí <br>⬇️";
      feedback.textContent = "";
  
      // Limpiar y cargar respuestas
      answers.innerHTML = "";
      currentQuestion.respuestas.forEach((respuesta) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('respuesta');
        answerDiv.setAttribute('draggable', 'true');
        answerDiv.setAttribute('data-answer', respuesta);
        answerDiv.textContent = respuesta;
        answers.appendChild(answerDiv);
      });
  
      // Habilitar/deshabilitar botones
      prevButton.disabled = currentQuestionIndex === 0;
      nextButton.disabled = true;
    }
  
    // Validar respuesta
    function validateAnswer(droppedAnswer) {
      const currentQuestion = preguntas[currentQuestionIndex];
      if (droppedAnswer === currentQuestion.correcta) {
        feedback.textContent = '¡Correcto!';
        feedback.className = 'correct';
        score++;
      } else {
        feedback.textContent = 'Incorrecto.';
        feedback.className = 'incorrect';
      }
      nextButton.disabled = false; // Habilitar botón siguiente
    }
  
    // Evento dragstart
    answers.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.dataset.answer);
    });
  
    // Evento dragover
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('dragover');
    });
  
    // Evento dragleave
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });
  
    // Evento drop
    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('dragover');
      const droppedAnswer = event.dataTransfer.getData('text/plain');
      dropZone.textContent = droppedAnswer;
      validateAnswer(droppedAnswer);
    });
  
    // Botón siguiente
    nextButton.addEventListener('click', () => {
      if (currentQuestionIndex < preguntas.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        showFinalScore();
      }
    });
  
    // Botón anterior
    prevButton.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
      }
    });
  
    // Mostrar puntuación final
    function showFinalScore() {
      questionElement.textContent = "¡Quiz completado!";
      dropZone.style.display = 'none';
      answers.style.display = 'none';
      feedback.style.display = 'none';
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
      scoreElement.textContent = `Tu puntuación: ${score} de ${preguntas.length}`;

    }
  
    // Cargar la primera pregunta
    loadQuestion();
  });
  