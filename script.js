document.addEventListener("DOMContentLoaded", () => {
  fetch("motores.json")
    .then(res => res.json())
    .then(datos => cargarFamilias(datos));
});

function cargarFamilias(datos) {
  const contenedorFamilias = document.getElementById("grid-familias");
  contenedorFamilias.innerHTML = "";

  datos.forEach(f => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${f.imagen_familia}" alt="${f.familia}">
      <h3>${f.familia}</h3>
    `;
    div.onclick = () => mostrarMotores(f);
    contenedorFamilias.appendChild(div);
  });
}

function mostrarMotores(familia) {
  document.getElementById("seccion-motores").classList.remove("oculto");
  document.getElementById("detalle-motor").classList.add("oculto");
  document.getElementById("titulo-familia").innerText = `Modelos: ${familia.familia}`;

  const contenedorMotores = document.getElementById("grid-motores");
  contenedorMotores.innerHTML = "";

  familia.modelos.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${m.imagen}" alt="${m.nombre}">
      <h4>${m.nombre}</h4>
    `;
    div.onclick = () => mostrarDetalle(m);
    contenedorMotores.appendChild(div);
  });
}

function mostrarDetalle(motor) {
  document.getElementById("detalle-motor").classList.remove("oculto");
  document.getElementById("nombre-motor").innerText = motor.nombre;
  document.getElementById("img-motor").src = motor.imagen;

  let htmlTabla = "<table><tr><th>Atributo</th><th>Especificación</th></tr>";
  for (const [clave, valor] of Object.entries(motor.especificaciones)) {
    htmlTabla += `<tr><td><strong>${clave}</strong></td><td>${valor}</td></tr>`;
  }
  htmlTabla += "</table>";

  document.getElementById("tabla-especificaciones").innerHTML = htmlTabla;
}
