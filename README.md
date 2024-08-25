# 📋 Aplicacion de gestion de tareas online

**Today** una aplicacion que te permite _organizar tus tareas_ de forma eficiente. Revisa los principales topicos.

## 📑 Tabla de contenidos

-   [Funcionalidades](#-funcionalidades)
-   [Forma de uso en produccion](#-forma-de-uso-en-produccion)
-   [Uso en modo de desarrollo](#-uso-en-modo-de-desarrollo)
-   [Configuraciones](#-Configuraciones)
-   [API Endpoints](#-api-endpoints)
-   [Contribuciones](#-contribuciones)
-   [Licencia](#-licencia)
-   [Contacto](#-contacto)

## ✨ Funcionalidades

-   Crea, edita y elimina tus tareas de hoy.
-   Crea, edita y elimina tus tareas para manana.
-   Marca tareas como completado.
-   Actualiza las categorias de tus tareas
-   Actualizacion automatica de tus tareas no completadas de ayer para el dia de hoy.
-   Responsive Design para mobiles y tablets.

## 💻 Forma de uso en produccion

Ingresa al sitio web y empieza a utilizarlo.

### 🚀 Uso en modo de desarrollo

Para ejecutar correctamente este proyecto en tu pc, asegurate de tener instalado previamente **Node.js (incluye npm)** y considera utilizar una version de **npm mayor o igual a v20.17.0.** Si consideras util gestionar tus versiones de npm, usa un gestor como nvm.

1. **Clona el repositorio remoto en tu pc:**

    ```bash
    git clone https://github.com/rolinlearning/today.git
    cd today
    ```

2. **Instala dependencias:**

    ```bash
    npm install
    ```

3. **Ejecuta la aplicacion:**

    ```bash
    npm run dev
    ```

4. **Abre tu navegador en el puerto especificado:**
   Al ejecutar el comando anterior te dara un link similar a esto `http://localhost:3000` solo copia, pegalo en tu navegador web, enter y listo. Estas listo para empezar a desarrollar. Enhorabuena!

## ⚙️ Configuraciones

[*Valido para el editor de codigo Sublime Text 4*] Considera tener instalado en tu editor de codigo los siguientes plugins:

-   **`ColorHelper`**: Te brinda previsualizaciones de colores, lo que supone de mucha ayuda para estilado con css.
-   **`JsPrettier`**: Te brinda la posibilidad de dar formato a tu codigo de forma sencilla siguiendo un marco opinionado o estadar.
-   **`LSP-typescript/`**: Te brinda soporte para javascript y typescript, como autocompletado de codigo, resaltado de errores, navegacion y formato de codigo.
-   **`LSP-css/`**: Te brinda soporte para css, como autocompletado de codigo, resaltado de errores, navegacion y formato de codigo.

Si estas usando otro editor de codigo como VS Code, verifica cuales de ellas funcionan bien alli y busca alternativas para las que no.

## 📚 API Endpoints

### Authentication (building)

-   **POST** `/api/auth/register`: Registrar nuevo usuario.
-   **POST** `/api/auth/login`: Autenticar nuevo usuario.

### Tasks

-   **GET** `/api/tasks`: Obtener todas las tareas para el usuario autenticado.
-   **POST** `/api/tasks`: Crear una nueva tarea.
-   **PUT** `/api/tasks/:id`: Actualizar una tarea por ID.
-   **DELETE** `/api/tasks/:id`: Eliminar una tarea por ID.

## 🤝 Contribuciones

Todas las contribuciones son bienvenidas, la idea es crear un avance grupal unanime, para ello solo tienes que hacer lo siguiente:

1. Haz un **Fork** del repositorio.
2. Crea una **nueva rama** (`git checkout -b feature-branch-name`).
3. Haz tus cambios.
4. Haz un **commit** de tus cambios (`git commit -m 'Add some feature'`).
5. Haz un **push** a tu rama (`git push origin feature-branch-name`).
6. Abre una **Pull Request**.

## 📝 Licencia

El proyecto esta bajo la Licencia "MIT License" - puedes revisar mas informacion en [LICENSE](LICENSE) para mas detalles.

## 📧 Contacto

Para consultar o dar sugerencias sobre el proyecto por favor realizarlo a [rolin.learning@gmail.com
](mailto:rolin.learning@gmail.com).

---

Gracias por hacer uso de esta aplicacion! que tu productividad siga! 🚀
