# Requerimientos del Sistema

## Requerimientos Funcionales (RF)

| ID        | Título                    | Descripción                                                                                                                        | Prioridad |
| :-------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| **RF-01** | Búsqueda de Recetas       | El sistema debe permitir al usuario ingresar un término de texto y recibir una lista de recetas coincidentes desde la API externa. | Alta      |
| **RF-02** | Visualización de Detalles | Al seleccionar una receta, el sistema debe mostrar imagen, título, editor e ingredientes.                                          | Alta      |
| **RF-03** | Gestión de Favoritos      | El usuario debe poder agregar o quitar la receta actual de su lista de favoritos.                                                  | Alta      |
| **RF-04** | Persistencia de Favoritos | La lista de favoritos debe conservarse incluso si el usuario cierra el navegador (LocalStorage).                                   | Media     |
| **RF-05** | Persistencia de Búsqueda  | El sistema debe recordar la última búsqueda realizada al recargar la página.                                                       | Baja      |
| **RF-06** | Navegación                | El usuario debe poder navegar entre "Home", "Favoritos" y "Detalles" sin recargar la página.                                       | Alta      |

## Requerimientos No Funcionales (RNF)

| ID         | Título             | Descripción                                                                                  |
| :--------- | :----------------- | :------------------------------------------------------------------------------------------- |
| **RNF-01** | Rendimiento (UI)   | La interfaz debe responder a las interacciones del usuario en menos de 200ms.                |
| **RNF-02** | Responsividad      | La aplicación debe ser completamente funcional en dispositivos móviles (320px+) y desktop.   |
| **RNF-03** | Disponibilidad API | El sistema debe manejar errores adecuadamente si la API externa (`forkify-api`) no responde. |
| **RNF-04** | Estética           | El diseño debe seguir lineamientos modernos utilizando Tailwind CSS.                         |
