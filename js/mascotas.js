const petList = document.getElementById("pet-list");
const petType = document.getElementById("petType");
const petName = document.getElementById("petName");
const client = document.getElementById("client");
const formData = document.getElementById("formData");
const btnCreate = document.getElementById("btn-create");
const btnClose = document.getElementById("btn-close");
const iconClose = document.getElementById("icon-close");
const index = document.getElementById("modalIndex");


var pets = [
  {
    petType: "Gato",
    petName: "Michifus",
    client: "Manuel",
  },
  {
    petType: "Perro",
    petName: "Firulais",
    client: "Luciana",
  },
];

//Función listar mascotas
function listPets() {
  const htmlPets = pets
    .map(
      (pet, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${pet.petType}</td>
    <td>${pet.petName}</td>
    <td>${pet.client}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button type="button" class="btn btn-danger delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </td>
</tr>`

    )
    .join("");
  petList.innerHTML = htmlPets;
  Array.from(document.getElementsByClassName('edit')).forEach((editButton, index) => editButton.onclick = edit(index));
  Array.from(document.getElementsByClassName('delete')).forEach((deleteButton, index) => deleteButton.onclick = deletePet(index));
}

//Función Crear
function sendData(event) {
  event.preventDefault();
  const data = {
    petType: petType.value,
    petName: petName.value,
    client: client.value,
  };
  const action = btnCreate.innerHTML;
  switch (action) {
    case 'Editar':
      pets[modalIndex.value] = data;
      break;
    default:
      pets.push(data);
      break;
  }

  listPets();
  resetModal();
}

//Función Editar
function edit(index) {
  let scopeFocus = document.getElementById('buttonNew')
  scopeFocus.addEventListener("click",() => {
    resetModal();
  });
  return function openModal() {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      })
    btnCreate.innerHTML = "Editar";
    myModal.toggle();
    const pet = pets[index];
    petName.value = pet.petName;
    client.value = pet.client;
    petType.value = pet.petType;
    modalIndex.value = index;
  }
}

//Función resetear Modal
function resetModal() {
  petName.value = '';
  client.value = 'Cliente';
  petType.value = 'Tipo de Animal';
  modalIndex.value = '';
  btnCreate.innerHTML = "Crear";
}

//Función Eliminar
function deletePet(index) {
  return function deleteData() {
      pets = pets.filter((pet, petIndex)=>petIndex !== index);
      listPets();

  }
}

listPets();

formData.onsubmit = sendData;
btnCreate.onclick = sendData;
