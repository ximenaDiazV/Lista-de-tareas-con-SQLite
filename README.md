# Lista de Tareas con SQLite

Esta es una aplicación web simple para gestionar tareas, creada con HTML, CSS y JavaScript. Permite a los usuarios agregar, visualizar, marcar como completadas y eliminar tareas, por lo que este sistema de almacenamiento de datos utiliza una base de datos SQLite, junto con Node.js.

---

## Estructura del Proyecto

El repositorio contiene los siguientes archivos:

- `index.html`: La estructura básica de la aplicación.
- `styles.css`: Los estilos CSS para la aplicación.
- `app.js`: La lógica en JavaScript que hace funcionar la lista de tareas.
- `server.js`: La lógica del backend en Node.js para manejar la conexión con la base de datos SQLite.


---

## Funcionalidades

1. **Agregar Tareas**: Puedes añadir nuevas tareas ingresando texto en el campo de entrada y haciendo clic en el botón "Agregar".
2. **Eliminar Tareas**: Cada tarea tiene un botón de "Eliminar" que permite eliminarla de la lista.
3. **Marcar como Completada**: Puedes marcar una tarea como completada haciendo clic en cada tarea (la casilla es solo un adorno). Las tareas completadas se moverán al final de la lista.
4. **Almacenamiento Local y Persistente**: Las tareas se guardan en una base de datos SQLite, permitiendo su persistencia incluso al recargar la página.
5. **Recuperar Tareas**: Al iniciar la aplicación, las tareas se recuperan de la base de datos y se muestran en la interfaz.
6. **Validación de Entrada**: Se evita agregar tareas vacías enviando una alerta de error al usuario.
7. **Responsividad**: La aplicación se ajusta a diferentes tamaños de pantalla.


---

## Capturas de Pantalla de la Aplicación en Funcionamiento

### Pantalla de Inicio
![Pantalla de Inicio](assets/img/inicio.png)

### Validación de Entrada
![Validación de Entrada](assets/img/validacion.png)

### Agregar Tareas
![Agregar Tareas](assets/img/agregar_tareas.png)

### Marcar Tareas como Completadas
![Marcar Completada](assets/img/marcar_completada.png)

![Marcar Completada en la Base de Datos](assets/img/marcar_completada2.png)

### Eliminar Tareas
![Eliminar Tarea](assets/img/eliminar.png)
![Eliminar Tarea en la Base de Datos](assets/img/eliminar2.png)

---

## Cómo Ejecutar la Aplicación

**Opción 1**

1. **Abre Visual Studio Code**:
   Si no tienes Visual Studio Code instalado, puedes descargarlo e instalarlo desde [aquí](https://code.visualstudio.com/).

2. **Clona este repositorio en tu máquina local**:
   ```bash
   git clone https://github.com/ximenaDiazV/Lista-de-Tareas.git

3. **Abre la carpeta del proyecto**:
   - Haz clic en **File** > **Open Folder...** y selecciona la carpeta donde clonaste el repositorio.

4. **Instala la extensión Live Server**:
   - Dirígete a la pestaña de extensiones (icono de cuadrado en la barra lateral izquierda).
   - Busca **"Live Server"** y haz clic en **"Instalar"**.

5. **Crea el proyecto en Node.js**:
   - Inicializa un nuevo proyecto en Node.js en el directorio del proyecto, ejecutando en la terminal:  **npm init -y**.

6. **Instala las dependencias**:
   - Una vez en el directorio del proyecto, ejecuta: **npm install express sqlite3 body-parser cors**. 
   - Esto teniendo en cuenta que tienes instalado Node.js también.

7. **Inicia el servidor**:
   - Ejecuta el archivo **"server.js"** con el siguiente comando: **node server.js**.
   - Haz clic derecho en el archivo `index.html` en el explorador de archivos y selecciona **"Open with Live Server"** o **"Abrir con"**. Esto abrirá la aplicación en tu navegador predeterminado.

