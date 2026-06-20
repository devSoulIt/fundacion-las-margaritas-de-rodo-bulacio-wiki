# Propuesta de paleta de colores para la web de las obras

## Análisis general

Las obras tienen una identidad visual muy marcada: una estética **retro, editorial, lúdica y artesanal**, con una fuerte presencia de:

* Rosa empolvado
* Celeste pastel
* Amarillo cálido
* Lila
* Verde agua

La paleta actual transmite una sensación más **institucional o corporativa**, lo que hace que parte de la personalidad de las obras se pierda.

El principal elemento que desentona es el azul oscuro (`#0b2d42`), ya que aporta una sensación tecnológica o de museo tradicional.

La propuesta es llevar la identidad visual hacia una estética de **galería de arte contemporáneo con inspiración editorial retro**.

---

# Cambios recomendados

## 1. Incorporar el rosa como color principal

El rosa aparece constantemente en las obras y debería formar parte de la identidad visual.

```css
--accent-pink: #e8b6c3;
--accent-pink-dark: #d89bab;
```

Usos sugeridos:

* Hero principal
* Detalles decorativos
* Hover suaves
* Fondos de algunas tarjetas

---

## 2. Reemplazar el azul oscuro

Actualmente:

```css
#0b2d42
```

Propuesta:

```css
--bg-dark: #35576b;
```

Este tono conserva elegancia sin generar una sensación tan institucional.

---

## 3. Reducir la saturación del verde

Actualmente:

```css
#2ec866
```

Propuesta:

```css
--accent-green: #79b88a;
--accent-green-dark: #5f9e72;
```

El verde actual se percibe demasiado asociado a interfaces modernas o startups.

---

## 4. Suavizar el celeste

Actualmente:

```css
#5bb8e8
```

Propuesta:

```css
--accent-celeste: #9dd7e8;
--accent-celeste-dark: #76c1d8;
```

Esto lo acerca más a la estética de las obras.

---

## 5. Mantener el amarillo

El amarillo funciona muy bien y puede conservarse.

Actualmente:

```css
#f5c500
```

Alternativa:

```css
#f2c94c
```

Un poco más suave y cálido.

---

# Paleta propuesta

```css
:root {

  /* Fondos */

  --bg: #ffffff;
  --bg-subtle: #f9f2f4;
  --bg-dark: #35576b;

  /* Textos */

  --text: #232323;
  --text-muted: #5c6a73;
  --text-faint: #8d9aa3;
  --white: #ffffff;

  /* Acentos */

  --accent-yellow: #f2c94c;
  --accent-pink: #e8b6c3;
  --accent-celeste: #9dd7e8;
  --accent-green: #79b88a;
  --accent-teal: #8fcfc9;

  /* Bordes */

  --border: #d9e8ee;
  --border-dark: #35576b;
}
```

---

# Nueva propuesta para las tarjetas

## Distribución actual

| Sección            | Color       |
| ------------------ | ----------- |
| 01 Rodolfo Bulacio | Amarillo    |
| 02 Fundación       | Celeste     |
| 03 Sala de Arte    | Verde       |
| 04 Galería         | Verde agua  |
| 05 Archivo         | Azul oscuro |
| 06 Contacto        | Verde       |

---

## Distribución propuesta

| Sección            | Color         |
| ------------------ | ------------- |
| 01 Rodolfo Bulacio | Rosa          |
| 02 Fundación       | Celeste       |
| 03 Sala de Arte    | Amarillo      |
| 04 Galería         | Verde agua    |
| 05 Archivo         | Azul petróleo |
| 06 Contacto        | Rosa          |

---

# Conclusión

La web no debería diseñarse como la de una fundación o un museo tradicional, sino como una **galería de arte contemporáneo con estética editorial retro**.

Las obras tienen mucha personalidad y la interfaz debería acompañarlas.

Actualmente, la identidad visual se percibe aproximadamente como:

* 70% institucional
* 30% artística

La propuesta es invertir esa relación:

* 30% institucional
* 70% artística

El objetivo es que la web se sienta más cercana a las propias obras: humana, artesanal, colorida y expresiva.
