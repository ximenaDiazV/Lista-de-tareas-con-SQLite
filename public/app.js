// Seleccionar el formulario, input de entrada y la lista de tareas
const formulario = document.getElementById('task-form');
const TareaInput = document.getElementById('new-task');
const ListaTareas = document.getElementById('task-list');
const MensajeError = document.getElementById('error-message');

// Cargar las tareas desde la base de datos cuando la aplicación inicia
document.addEventListener('DOMContentLoaded', loadTasksFromServer);

// Variable para almacenar el timeout del mensaje de error
let errorTimeout;

// Agregar una nueva tarea
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const InfoTarea = TareaInput.value.trim();
    if (InfoTarea === '') {
        // Mostrar mensaje de error y resaltar el campo
        MensajeError.textContent = 'No puedes agregar tareas vacías. Tú puedes, escribe algo :)';
        MensajeError.style.display = 'block';
        TareaInput.style.border = '2px solid red'; // Resaltar el campo

        // Ocultar el mensaje después de 3 segundos
        clearTimeout(errorTimeout); // Asegurarse de que no haya otros temporizadores activos
        errorTimeout = setTimeout(() => {
            MensajeError.style.display = 'none';
        }, 3000);

        return;
    }

    // Ocultar el mensaje de error si el campo está bien
    MensajeError.style.display = 'none';
    TareaInput.style.border = ''; // Reiniciar el borde si hay entrada válida
    addTaskToServer(InfoTarea);
    TareaInput.value = '';
});

// Eliminar borde rojo al escribir en el campo nuevamente
TareaInput.addEventListener('input', function() {
    clearTimeout(errorTimeout); // Eliminar el temporizador si el usuario comienza a escribir
    if (TareaInput.value.trim() !== '') {
        MensajeError.style.display = 'none';
        TareaInput.style.border = ''; // Reiniciar borde si se corrige el error
    }
});

// Manejar eventos de la lista (eliminar, marcar completada y tachar)
ListaTareas.addEventListener('click', function(event) {
    const li = event.target.closest('li');

    if (!li) return;

    const taskId = li.dataset.id;
    const casillaAdorno = li.querySelector('input[type="checkbox"]');

    if (event.target.classList.contains('btn-eliminar')) {
        deleteTaskFromServer(taskId, li);
    } else {
        const completed = !casillaAdorno.checked;
        casillaAdorno.checked = completed; // Asegurar que la casilla esté sincronizada
        toggleTaskCompletionOnServer(taskId, completed, li);
    }
});

// Función para añadir tarea al DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id; // Guardar el ID de la tarea

    // Casilla de verificación
    const casillaAdorno = document.createElement('input');
    casillaAdorno.type = 'checkbox';
    casillaAdorno.checked = task.completada;
    li.appendChild(casillaAdorno);

    // Nodo de texto para la tarea
    const textNode = document.createElement('span');
    textNode.textContent = task.descripcion;
    li.appendChild(textNode);

    if (task.completada) {
        li.classList.add('completed');
    }

    // Botón de eliminar
    const BotonEliminar = document.createElement('button');
    BotonEliminar.classList.add('btn-eliminar');
    BotonEliminar.innerHTML = 'Eliminar <i class="fas fa-trash icon"></i>';
    li.appendChild(BotonEliminar);

    ListaTareas.appendChild(li);
    moveCompletedTasksToEnd();
}

// Función para alternar el estado de la tarea en el servidor
function toggleTaskCompletionOnServer(taskId, completed, li) {
    fetch(`http://localhost:3000/tareas/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completada: completed ? 1 : 0 })
    })
    .then(response => {
        if (response.ok) {
            li.classList.toggle('completed', completed);
            moveCompletedTasksToEnd();
        } else {
            alert('Error al actualizar la tarea. Por favor, intenta de nuevo.'); // Mensaje de error al actualizar
        }
    })
    .catch(error => {
        console.error('Error al actualizar tarea:', error);
        alert('Error al actualizar la tarea. Por favor, intenta de nuevo.'); // Mensaje de error al actualizar
    });
}

// Función para cargar tareas desde el servidor
function loadTasksFromServer() {
    fetch('http://localhost:3000/tareas')
        .then(response => response.json())
        .then(data => {
            data.tareas.forEach(task => {
                addTaskToDOM(task);
            });
        })
        .catch(error => {
            console.error('Error al cargar las tareas:', error);
            alert('Error al cargar las tareas. Por favor, intenta de nuevo más tarde.'); // Mensaje de error al cargar tareas
        });
}

// Función para guardar tarea en el servidor
function addTaskToServer(InfoTarea) {
    fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion: InfoTarea })
    })
    .then(response => response.json())
    .then(task => {
        addTaskToDOM(task);
    })
    .catch(error => {
        console.error('Error al agregar tarea:', error);
        alert('Error al agregar tarea. Por favor, intenta de nuevo.'); // Mensaje de error al agregar tarea
    });
}

// Función para eliminar tarea del servidor
function deleteTaskFromServer(taskId, li) {
    fetch(`http://localhost:3000/tareas/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            li.classList.add('removing'); // Agregar una clase con animación
            setTimeout(() => li.remove(), 500); // Eliminar después de la animación
        } else {
            alert('Error al eliminar tarea. Por favor, intenta de nuevo.'); // Mensaje de error al eliminar tarea
        }
    })
    .catch(error => {
        console.error('Error al eliminar tarea:', error);
        alert('Error al eliminar tarea. Por favor, intenta de nuevo.'); // Mensaje de error al eliminar tarea
    });
}

// Mover tareas completadas al final de la lista
function moveCompletedTasksToEnd() {
    const tasks = Array.from(ListaTareas.children);
    tasks.forEach(task => {
        if (task.classList.contains('completed') && task !== ListaTareas.lastChild) {
            ListaTareas.appendChild(task);
        }
    });
}
