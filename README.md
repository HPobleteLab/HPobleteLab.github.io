# HPoblete Lab - Website

[![Astro](https://img.shields.io/badge/Astro-v6.2.1-orange.svg?style=flat-sm&logo=astro)](https://astro.build)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3.4+-blue.svg?style=flat-sm&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?style=flat-sm&logo=typescript)](https://www.typescript.org/)
[![GitHub Pages Deployment](https://github.com/HPobleteLab/hpobletelab.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/HPobleteLab/hpobletelab.github.io/actions/workflows/deploy.yml)

Este repositorio contiene el código fuente del sitio web oficial del **HPoblete Lab (Bio-nanomaterial Simulations Group)** de la **Universidad de Talca, Chile**. El sitio está construido con **Astro**, aprovechando su arquitectura basada en componentes y colecciones de contenido estático para ofrecer un rendimiento óptimo, accesibilidad premium, soporte nativo de modo claro/oscuro y animaciones fluidas compatibles con `ClientRouter` (View Transitions).

---

## 🛠️ Tecnologías y Características

- **Astro (v6+)**: Generación de sitios estáticos (SSG) ultra rápidos con arquitectura de islas.
- **Tailwind CSS**: Estilizado moderno, responsivo y optimizado con transiciones de hardware aceleradas (`transform-gpu`).
- **Content Collections & Loaders (`glob`)**: Gestión estructurada de datos académicos (Publicaciones, Miembros del Equipo, Líneas de Investigación y Recursos Educativos) mediante archivos Markdown (`.md`).
- **Componentes Nativos Modernos**: Uso de la etiqueta HTML5 `<dialog>` para ventanas emergentes de alto rendimiento integradas en el *Top Layer* del navegador.
- **Filtros Dinámicos con Efecto Cascada**: Scripts optimizados para Astro que evitan el parpadeo de pantalla y animan las tarjetas de forma fluida.
- **GitHub Actions**: Despliegue automatizado continuo (CI/CD) directo a **GitHub Pages**.

---

## 📂 Estructura del Proyecto

La arquitectura sigue las mejores prácticas de modularización y componentización de Astro:

``` bash
├── .github/workflows/          # Configuración de CI/CD para GitHub Actions
├── public/                     # Archivos estáticos públicos (imágenes de la web, placeholders)
├── src/
│   ├── components/
│   │   ├── core/               # Componentes reutilizables maestros (Modal, Badge, etc.)
│   │   └── sections/           # Secciones modulares de la página de inicio (Hero, Team, Funding, etc.)
│   ├── content/                # Archivos de datos en formato Markdown (.md)
│   │   ├── publications/       # Papers académicos indexados por año
│   │   ├── research/           # Líneas de investigación del laboratorio
│   │   ├── resources/          # Herramientas de software y tutoriales formativos
│   │   └── team/               # Fichas del equipo (PI, estudiantes, alumni)
│   ├── layouts/
│   │   └── Layout.astro        # Plantilla maestra (Layout global, scripts de Scroll Reveal, estilos base)
│   ├── pages/                  # Enrutamiento automático basado en páginas (.astro)
│   │   ├── index.astro         # Página de Inicio (Home unificado y componentizado)
│   │   ├── publications.astro  # Vista avanzada de Publicaciones científicas con filtros por año
│   │   ├── research.astro      # Detalle de líneas de investigación con micro-interacciones
│   │   ├── resources.astro     # Plataforma de recursos formativos y herramientas con botones dinámicos
│   │   └── team.astro          # Directorio completo de miembros del laboratorio
│   ├── utils/                  # Funciones formateadoras de texto y ordenadores de colecciones
│   └── content.config.ts       # Definición de esquemas de datos estructurados con Zod
├── astro.config.mjs            # Configuración principal de Astro (Site, Base URL, etc.)
├── package.json                # Dependencias, scripts y versionamiento SemVer (ej. v0.0.3)
└── tailwind.config.mjs         # Configuración y paleta de colores corporativos del laboratorio

```

---

## 🚀 Inicio Rápido (Desarrollo Local)

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18.x o superior).

1. **Clonar el repositorio:**

```bash
git clone [https://github.com/HPobleteLab/hpobletelab.github.io.git](https://github.com/HPobleteLab/hpobletelab.github.io.git)
cd hpobletelab.github.io

```

2. **Instalar dependencias:**

```bash
npm install

```

3. **Iniciar el servidor de desarrollo local:**

```bash
npm run dev

```

El sitio estará disponible en `http://localhost:4321/`. Vite optimizará automáticamente las dependencias y vigilará los cambios en tiempo real.

4. **Construir el sitio para producción de manera local:**

```bash
npm run build

```

---

## ✍️ Gestión de Contenidos (Archivos Markdown)

Gracias al sistema de **Content Collections**, añadir información al sitio web no requiere tocar código HTML/CSS. Solo debes crear o editar archivos `.md` en la carpeta correspondiente dentro de `src/content/`.

### 📚 Añadir una Publicación (`src/content/publications/`)

Crea un archivo con el formato `nombre-del-paper.md` y define su metadata (Frontmatter):

```markdown
---
title: "Incredible title"
authors: "Poblete H., et al."
journal: "Journal of Awesome"
year: "2025"
doi: "10.1063/xxxxx"
volume: "162"
pages: "104-112"
link: "[https://doi.org/10.1063/xxxxx](https://doi.org/10.1063/xxxxx)"
category: "Molecular Dynamics"
image: "/images/papers/graphical-abstract-2025.png"
# Opcional: si existe, se muestra a la derecha
---

```

### 🎓 Añadir un Miembro del Equipo (`src/content/team/`)

Crea un archivo como `Practicante.md`:

```markdown
---
name: "Bioinformatica Bioinformatica"
category: "Undergraduate Student" 
# Opciones válidas: 'Principal Investigator', 'Research Assistant', 'PhD Student', 'Undergraduate Student', 'Alumni'
image: "/images/team/Practicante.jpg"
email: "practicante@utalca.cl"
linkedin: "[https://linkedin.com/in/](https://linkedin.com/in/)..."
weight: 2 
# Controla el orden de aparición en la grilla
---
Le gusta la Bioniformatica.

```

### 🛠️ Añadir un Recurso Educativo (`src/content/resources/`)

Crea un archivo en `src/content/resources/`:

```markdown
---
title: "VMD > PyMOL"
description: "VMD es muy bueno"
category: "Tool" 
# Debe ser obligatoriamente 'Tutorial' o 'Tool'
link: "[https://github.com/HPobleteLab/umbrella-script](https://github.com/HPobleteLab/umbrella-script)"
actionType: "github" 
# Opciones válidas: 'github' (View Repository), 'pdf' (Download PDF), 'download' (Download Resource), 'link' (Access Link)
---

```

---

## 🌐 Configuración e Implementación en GitHub Pages

Dado que la página se compila como HTML/CSS estático puro, es perfecta para hospedarse de manera gratuita en **GitHub Pages**. Existen dos formas comunes de configurarla según la estructura de tu cuenta de GitHub:

### 1. Configuración de URLs (`astro.config.mjs`)

Abre tu archivo `astro.config.mjs` y ajusta las propiedades según tu caso:

- **Caso A: Repositorio de Organización/Usuario principal** (Ej: `https://hpobletelab.github.io/`)

```javascript
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: '[https://hpobletelab.github.io](https://hpobletelab.github.io)',
  base: '/', // Va en la raíz
});

```

- **Caso B: Repositorio como subproyecto** (Ej: `https://hpobletelab.github.io/sitio-web/`)

```javascript
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: '[https://hpobletelab.github.io](https://hpobletelab.github.io)',
  base: '/sitio-web', // Debe coincidir exactamente con el nombre del repositorio
});

```

### 2. Despliegue Automatizado con GitHub Actions (CI/CD)

Para que el sitio se construya y actualice solo cada vez que hagas un `git push`, hemos configurado un flujo de trabajo automatizado.

Crea un archivo en `.github/workflows/deploy.yml` con el siguiente contenido:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ] # Ejecutar cuando se suban cambios a la rama principal

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build Astro Site
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build static files
        run: npm run build

      - name: Upload production artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Deploy to GitHub Pages
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

### 3. Activar los Permisos en GitHub

Para que la Action tenga permiso de publicar los archivos compilados en la rama oculta de hosting (`gh-pages`):

1. Entra a tu repositorio en **GitHub**.
2. Ve a **Settings** -> **Pages**.
3. En la sección **Build and deployment** -> **Source**, asegúrate de cambiar "Deploy from a branch" por **GitHub Actions**.

¡Listo! A partir de ese momento, cualquier cambio que guardes en los archivos Markdown o en los componentes se compilará y subirá automáticamente a internet en menos de un minuto.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.

---

🔬 **HPoblete Lab** - *Universidad de Talca, Chile.* Para consultas académicas o de software, por favor contáctanos mediante los canales oficiales en el pie de página de la web.