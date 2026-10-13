# KAGGLE LAB — Laboratorio Interactivo de Datos
*Explora. Descarga. Analiza. Transforma.*

Plataforma educativa estática (HTML, CSS, JavaScript; sin backend ni dependencias) para la asignatura Modelos de Transformación Empresarial, Ingeniería de Sistemas, Universidad Simón Bolívar - Campus Cúcuta.

## Estructura
- `index.html`: página única con navegación lateral y pie institucional.
- `assets/css/styles.css`: estilos (modo claro/oscuro, responsive, impresión).
- `assets/js/progress.js`: progreso en `localStorage` (con aviso si está bloqueado) e insignias.
- `assets/js/content.js`: módulos 0–8, datasets (`DS`), casos (`CASES`), glosario (`GLOS`), pasos de descarga (`ST`).
- `assets/js/activities.js`: las 10 actividades (`Q`, `KW`, `MATCH`, `FIELDS`, `MT`).
- `assets/js/app.js`: navegación, panel de progreso, búsqueda de recursos.
- `docs/guia-publicacion.md`: publicación y revisión de enlaces.

## Ejecutar localmente
Abra `index.html` en el navegador (no requiere servidor).

## Modificar contenidos
- Textos de módulos: `MOD` en `content.js`. Preguntas: `Q` en `activities.js` (la respuesta correcta es el índice 0, 1, 2… de las opciones; varíelo).
- Nuevo dataset: agregue un objeto a `DS` (nombre, tema, problema, nivel, `u`, `verif`, descripción, actividad). Use `verif:'ficha'` solo si comprobó que la página existe y coincide; use `'búsqueda'` para enlaces de búsqueda.

## Funcionalidades
Diagnóstico (8 preguntas), cuestionarios de funcionalidades y licencias, simulador de palabras clave, comparador (Detective de datasets, casos ficticios), lista «Mi primera descarga» (autorreporte), problemas de calidad, clasificación de variables, relación problema–dataset, reto final con ficha descargable (.txt) o imprimible (PDF desde el navegador), progreso, insignias y modo claro/oscuro.

## Privacidad y límites
- El progreso y la ficha se guardan solo en este navegador (`localStorage`); no se envía nada a servidores. No es una calificación institucional.
- La página no se conecta a Kaggle; no confirma descargas. No pida ni escriba tokens.
- Limitaciones conocidas: de los datasets solo se verificó que las fichas existan y su título/descripción pública; variables, formatos y licencias deben consultarse en Kaggle. Los enlaces a secciones generales de Kaggle (`/code`, `/learn`, etc.) no pudieron comprobarse automáticamente. No hay capturas reales de Kaggle (se usa un esquema original).

## Idiomas (ES/EN)
- Selector 🇪🇸/🇺🇸 en la barra superior; preferencia en `localStorage` (`kagglelab-lang`), español por defecto; sin almacenamiento funciona durante la sesión.
- `assets/js/i18n.js` contiene el diccionario `EN` (clave = texto fuente en español) y reglas para textos con números. El motor traduce el DOM in situ (incluido lo generado dinámicamente), por eso cambiar de idioma no reinicia respuestas, puntuaciones ni progreso.
- **Agregar o cambiar un texto:** edite el español en `content.js`/`activities.js` y añada su traducción en `EN` con exactamente el mismo texto como clave (ignorando espacios repetidos). Un texto sin entrada se muestra en español.
- Limitación: las claves son los textos fuente, no identificadores numéricos; si cambia un texto en español debe actualizar su clave.

## Revisión técnica de interacciones (13 de octubre de 2026)
- En los cuestionarios, una opción seleccionada queda bloqueada; si es incorrecta, se señala la correcta. Las selecciones parciales se guardan localmente y se restauran bloqueadas después de volver a cargar la página. El botón explícito «Volver a intentar» reinicia el cuestionario correspondiente.
- Las actividades con botón «Evaluar» exigen una selección o todos los campos requeridos antes de mostrar retroalimentación. Tras una evaluación válida, sus controles quedan bloqueados y la evaluación se restaura al volver a cargar.
- La barra de progreso y las insignias cuentan únicamente actividades evaluadas o pasos completados. Desmarcar un paso de la lista o vaciar un campo obligatorio de la ficha retira la finalización correspondiente.
- Se verificaron sintaxis de JavaScript, ausencia de errores en pruebas de interacción, selector ES/EN, restauración de evaluaciones y visualización móvil a 390 px. Los estilos y la distribución de la página se conservaron; solo se añadió un indicador visual discreto para botones deshabilitados.
