const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const formData = document.getElementById("formData");
const btnGuardar = document.getElementById("btn-guardar");
const btnCerrar = document.getElementById("btn-cerrar");
const btnClose = document.getElementById("btnClose");
const indice = document.getElementById("indice");
const modal = document.getElementById("exampleModal");

var mascotas = [
  {
    tipo: "Gato",
    nombre: "Michifus",
    dueno: "Manuel",
  },
  {
    tipo: "Perro",
    nombre: "Firulais",
    dueno: "El Washi",
  },
];

function listarMascotas() {
  const htmlMascotas = mascotas
    .map(
      (mascota, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary editar"><i class="fa-regular fa-pen-to-square"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </td>
</tr>`

    )
    .join("");
  listaMascotas.innerHTML = htmlMascotas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    tipo: tipo.value,
    nombre: nombre.value,
    dueno: dueno.value,
  };
  const accion = btnGuardar.innerHTML;
  switch (accion) {
    case "Editar":
      mascotas[indice.value] = datos;
      break;
    default:
      mascotas.push(datos);
      break;
  }

  listarMascotas();
  resetModal();
}

function editar(index) {
  let scopeFocus = document.getElementById('buttonNew')
  scopeFocus.addEventListener("click",() => {
    resetModal();
  });
  return function cuandoCliqueo() {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      })
    btnGuardar.innerHTML = "Editar";
    myModal.toggle();
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    tipo.value = mascota.tipo;
    indice.value = index;
  }
}

function resetModal() {
  nombre.value = '';
  dueno.value = 'Dueno';
  tipo.value = 'Tipo de Animal';
  indice.value = '';
  btnGuardar.innerHTML = "Guardar";
}

function eliminar(index) {
  return function clickEnEliminar() {
      mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
      listarMascotas();

  }
}

listarMascotas();

formData.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar.onclick = resetModal;
// modal.onclick = resetModal;
btnClose.onclick = resetModal;
