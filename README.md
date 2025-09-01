# Betancort & Co — Landing (Figma → Web)

> Maquetado estático a partir de Figma. Tech stack **HTML + CSS + JS** (vanilla).  
> **Estado:** WIP (en progreso).

![Preview](https://github.com/J0ak0/BETANCORT/blob/main/assets/preview.png)

---

## 📦 Estructura
```
.
├─ index.html
├─ styles.css
├─ main.js
└─ assets/
   ├─ img/
   │  ├─ bg-hero-pattern.png
   │  ├─ hero.jpg, partners.jpg, tech.jpg, research.jpg, smb.jpg, contact.jpg
   │  └─ brand-*.svg  (5 logos)
   └─ fonts/ (si aplica)

```
Variables principales en `styles.css` (`:root`): colores, tipografías y spacing.

- **Tipografías**: Inter (base) + Playfair Display (acento).
- **Colores**:
  - `--primary: #3B82F6` (botones)
  - `--accent:  #4172E9` (textos/acentos)
- **Container**: `--container: 1180px` (modificable).

---

## 🚀 Cómo correr localmente
1. Abrí el proyecto en **VS Code**.
2. Instala la extensión **Live Server** (si no la tenés).
3. Click derecho sobre `index.html` → **Open with Live Server**.

> Alternativa sin VS Code: abrí `index.html` directamente en el navegador.

---

## ✨ Funcionalidades implementadas
- Header **transparente** que pasa a **sólido** al scrollear.
- Hero **centrado**, con **gradiente** y **pattern** que se ve también debajo del nav.
- Sección “Partners” (split): imagen **cover** dentro del `figure`, texto con lista de **checks**.
- “Our Journey”: título en **una línea** (`kicker + h2`).
- **KPIs**, **Industry experience** (3 cards), **Testimonial** con slider simple, **Contacto** (formulario).
- **Responsive** (desktop/tablet/móvil) y tokens de diseño en `:root`.
- Accesibilidad base: `alt`, `aria-label`, foco visible, `skip-link`.



