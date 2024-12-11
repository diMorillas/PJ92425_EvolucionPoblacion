document.addEventListener('DOMContentLoaded', () => {
    // Preguntas del quizz
    const preguntas = [
      { 
        "pregunta": "¿Qué país tiene la mayor tasa de natalidad en 2024?", 
        "respuestas": ["Níger", "India", "China"], 
        "correcta": "Níger" 
      },
      { 
        "pregunta": "¿Qué país tiene la mayor cantidad de emigrantes viviendo en el extranjero?", 
        "respuestas": ["India", "México", "China"], 
        "correcta": "India" 
      },
      { 
        "pregunta": "¿Qué continente tiene más habitantes?", 
        "respuestas": ["Asia", "África", "Europa"], 
        "correcta": "Asia" 
      },
      { 
        "pregunta": "¿Cuál es el país con mayor densidad de población?", 
        "respuestas": ["Mónaco", "Singapur", "Bangladés"], 
        "correcta": "Mónaco" 
      },
      { 
        "pregunta": "¿Cuál es la población aproximada de India en 2024?", 
        "respuestas": ["1.4 mil millones", "1.6 mil millones", "1.2 mil millones"], 
        "correcta": "1.4 mil millones" 
      },
      { 
        "pregunta": "¿Cuál es el principal motivo de migración global?", 
        "respuestas": ["Trabajo", "Educación", "Reunificación familiar"], 
        "correcta": "Trabajo" 
      },
      { 
        "pregunta": "¿Qué país europeo tiene mayor porcentaje de inmigrantes?", 
        "respuestas": ["Alemania", "Suiza", "Francia"], 
        "correcta": "Suiza" 
      },
      { 
        "pregunta": "¿Cuál es el continente con mayor tasa de emigración?", 
        "respuestas": ["África", "Europa", "Asia"], 
        "correcta": "África" 
      },
      { 
        "pregunta": "¿Qué región del mundo tiene la tasa de crecimiento poblacional más alta?", 
        "respuestas": ["África Subsahariana", "Sudeste Asiático", "América Latina"], 
        "correcta": "África Subsahariana" 
      },
      { 
        "pregunta": "¿Qué país tiene la mayor cantidad de refugiados?", 
        "respuestas": ["Turquía", "Pakistán", "Uganda"], 
        "correcta": "Turquía" 
      }
    ]
    ;
  
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
  