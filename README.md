<div align="center">
  <img src="IMG/logo.png" alt="Logo de To-Do List" width="90" />

  # To-Do List

  **Aplicación web para organizar tareas, prioridades y actividades del día a día.**

  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
  ![Storage](https://img.shields.io/badge/Storage-localStorage-6B7280)

  **[Probar la aplicación](https://starkiller6637.github.io/Todolist/) · [Explorar el código](https://github.com/starkiller6637/Todolist)**
</div>

---

## Descripción

**To-Do List** es una aplicación frontend desarrollada con **HTML, CSS y JavaScript puro**, sin frameworks ni dependencias de terceros. Permite crear y administrar tareas, organizarlas por categoría o fecha y consultar rápidamente cuáles están pendientes.

El proyecto fue creado como un **challenge técnico** para practicar manipulación del DOM, manejo de eventos, lógica de filtrado, persistencia de datos y diseño responsive.

## Funcionalidades

| Gestión de tareas | Organización y visualización |
| --- | --- |
| Agregar, editar y eliminar tareas | Vistas **Todo**, **Hoy**, **Próximos días** e **Importante** |
| Marcar tareas como completadas | Filtrar por **todas**, **pendientes** o **completadas** |
| Asignar una fecha a cada tarea | Clasificar por **Escuela**, **Trabajo**, **Casa** o **Personal** |
| Destacar tareas importantes | Combinar filtros de vista, sección y estado |
| Eliminar todas las tareas completadas | Consultar el contador de tareas pendientes |

Otras características:

- **Persistencia local:** las tareas se guardan en `localStorage` y permanecen disponibles al recargar la página en el mismo navegador, mientras no se borren esos datos.
- **Tema claro y oscuro:** el tema seleccionado también se recuerda con `localStorage`.
- **Diseño adaptable:** la interfaz se ajusta a diferentes tamaños de pantalla con CSS responsive.
- **Sin registro ni servidor:** la aplicación funciona del lado del cliente.

> **Sobre las fechas:** la vista «Próximos días» muestra tareas con fecha posterior a hoy; el filtro actual no limita los resultados a una cantidad fija de días.

## Demo

Puedes abrir la versión publicada en GitHub Pages:

### [Abrir To-Do List en el navegador →](https://starkiller6637.github.io/Todolist/)

No es necesario crear una cuenta ni instalar dependencias para usar la versión publicada.

## Instalación local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/starkiller6637/Todolist.git
   cd Todolist
   ```

2. Abre `index.html` en tu navegador. Para trabajar localmente de forma más consistente, también puedes usar la extensión **Live Server** de VS Code o levantar un servidor HTTP sencillo.

   Si tienes Python instalado, por ejemplo:

   ```bash
   python -m http.server 8000
   ```

3. Con el servidor en ejecución, visita `http://localhost:8000`.

**Nota:** Python es opcional para servir los archivos durante el desarrollo; **no forma parte de la aplicación**. No es necesario ejecutar `npm install`.

## Cómo usar la aplicación

1. Haz clic en **Agregar +** para crear una tarea.
2. Escribe la descripción, elige una sección, define la fecha y, si lo deseas, márcala como importante.
3. Usa las vistas laterales para consultar las tareas del día, las futuras o las importantes.
4. Combina los filtros de sección y estado para encontrar tareas específicas.
5. Marca las tareas terminadas, edítalas o elimínalas desde la lista.
6. Cambia entre tema claro y oscuro desde el menú lateral.

## Estructura del proyecto

```text
Todolist/
├── index.html           # Estructura y elementos de la interfaz
├── CSS/
│   └── styles.css       # Estilos, temas y diseño responsive
├── JS/
│   └── script.js        # Lógica, eventos, filtros y persistencia
├── IMG/
│   └── logo.png         # Logo de la aplicación
└── README.md            # Documentación del proyecto
```

## Decisiones técnicas

- **JavaScript sin frameworks:** para demostrar manipulación del DOM y gestión de eventos sin bibliotecas adicionales.
- **Estado y filtros:** las tareas se almacenan en memoria y se filtran según la vista, sección y estado seleccionados.
- **Persistencia:** `localStorage` guarda las tareas y la preferencia de tema en el navegador.
- **Renderizado dinámico:** la lista se actualiza después de las operaciones de creación, edición, eliminación y cambio de estado.
- **Diseño responsive:** se utilizan CSS Grid, Flexbox y media queries para adaptar la interfaz.

## Alcance y limitaciones

Esta es una aplicación frontend que funciona **sin backend, base de datos remota ni autenticación**.

- La información se guarda **solo en el navegador y dispositivo utilizados**; no se sincroniza entre equipos.
- Si se eliminan los datos del sitio o se borra el almacenamiento del navegador, las tareas pueden perderse.
- No hay notificaciones automáticas, recordatorios ni colaboración entre usuarios.
- El repositorio no incluye una suite de pruebas automatizadas.

## Autor

Proyecto desarrollado por **[Derek Alejandro Sauceda Morales](https://github.com/starkiller6637)** como parte de un challenge técnico de desarrollo frontend.
