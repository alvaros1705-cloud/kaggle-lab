# Guía de publicación y mantenimiento

## GitHub Pages
1. Cree un repositorio y suba el contenido de esta carpeta (con `index.html` en la raíz).
2. En *Settings → Pages*, elija *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. Espere unos minutos y abra la URL que GitHub indica. Todas las rutas son relativas.
4. No suba nunca `kaggle.json` ni tokens; agréguelos a `.gitignore`.

## Revisar enlaces de Kaggle (cada semestre)
1. Abra cada enlace de `URLS` en `assets/js/content.js` y confirme que la ficha existe y su título coincide.
2. Revise que los nombres de secciones (Datasets, Code, Models, Discussions, Learn) sigan vigentes.
3. Confirme los comandos de la Kaggle API y el método de autenticación en la documentación oficial.
4. Actualice `DS` y anote la fecha de verificación.
