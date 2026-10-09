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
