const petList = document.getElementById("pet-list");
const petType = document.getElementById("petType");
const petName = document.getElementById("petName");
const client = document.getElementById("client");
const formData = document.getElementById("formData");
const btnSave = document.getElementById("btn-save");
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
    client: "Ricardo",
  },
];

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

function sendData(event) {
  event.preventDefault();
  const data = {
    petType: petType.value,
    petName: petName.value,
    client: client.value,
  };
  const action = btnSave.innerHTML;
  switch (action) {
    case "Edit":
      pets[modalIndex.value] = data;
      break;
    default:
      pets.push(data);
      break;
  }

  listPets();
  resetModal();
}

function edit(index) {
  let scopeFocus = document.getElementById('buttonNew')
  scopeFocus.addEventListener("click",() => {
    resetModal();
  });
  return function cuandoCliqueo() {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      })
    btnSave.innerHTML = "Editar";
    myModal.toggle();
    const pet = pets[index];
    petName.value = pet.petName;
    client.value = pet.client;
    petType.value = pet.petType;
    modalIndex.value = index;
  }
}

function resetModal() {
  petName.value = '';
  client.value = 'Cliente';
  petType.value = 'Tipo de Animal';
  modalIndex.value = '';
  btnSave.innerHTML = "Guardar";
}

function deletePet(index) {
  return function deleteData() {
      pets = pets.filter((pet, petIndex)=>petIndex !== index);
      listPets();

  }
}

listPets();

formData.onsubmit = sendData;
btnSave.onclick = sendData;
