Dado el siguiente código de HTML, asignar los colores correspondientes según el ejemplo visual a los diferentes elementos.

**Resultado**

---

![Captura de Pantalla 2022-09-12 a las 11.18.02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1368f106-d28a-441c-9ad7-6a8e96edd87b/Captura_de_Pantalla_2022-09-12_a_las_11.18.02.png)

**Autoevaluación**

---

- Los colores a aplicar son los siguientes: #c92a2a, #a61e4d y #364fc7.
- El segundo contenido tiene un borde inferior del mismo color que el título.
- Tanto el título como el subtitulo tiene que tener los colores asignados a través de los elementos, y el resto de contenido a través de las clases asignadas.
- Asignar el color del primer y segundo contenido en la misma línea de CSS.
- Asignar el subrayado con borde en otra diferente.
- El borde inferior del segundo contenido en sólido y tiene 1px de grosor. Asignare todas las propiedades del borde en la misma línea.

**Html code**

---

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colors</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Título</h1>
    <h2>Subtitulo</h2>
    <p class="first">Primer contenido</p>
    <p class="second">Segundo contenido</p>
  </body>
</html>
```
