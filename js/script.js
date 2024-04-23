"use strict"

$('#cep').mask('00000-000');

const cadastrados = []

let cepData = ""

const cepField = document.getElementById("cep");
const cepFeedback = document.getElementById("cepFeedback");
const table = document.getElementById("tableBody");
const form = document.getElementById("form");

cepField.addEventListener("focus", (event) => {
  if ((event.target.value).length < 9) {
    cepFeedback.innerHTML = "Insira um CEP válido!";
    cepField.classList.add("is-invalid");
  }
})

cepField.addEventListener("input", (event) => {
  addDataIntoForm({})
  if ((event.target.value).length == 9) {
    cepField.classList.remove("is-invalid")
  }
  if ((event.target.value).length < 9) {
    cepFeedback.innerHTML = "Insira um CEP válido!";
    cepField.classList.add("is-invalid")
  }
})

function addWrongCepFeedBack() {
  addDataIntoForm({})
  const cepFeedback = document.getElementById("cepFeedback");
  cepFeedback.innerHTML = "CEP não econtrado!";
  cepField.classList.add("is-invalid");
}

function addDataIntoForm(data) {
  const address = document.getElementById("address");
  const number = document.getElementById("number");
  const neighborhood = document.getElementById("neighborhood");
  const city = document.getElementById("city");
  const province = document.getElementById("province");

  address.value = data.logradouro || "";
  neighborhood.value = data.bairro || "";
  city.value = data.localidade || "";
  province.value = data.uf || "";
  data.hasOwnProperty("logradouro")
    ? number.disabled = false
    : number.disabled = true;
}

cepField.addEventListener("blur", async (event) => {
  const cep = (event.target.value).replace("-", "");
  if (cep.length === 8) {
    const response = await getCEP(cep);
    if (response.erro) {
      addWrongCepFeedBack();
    } else {
      addDataIntoForm(response);
    }
  }
})

async function getCEP(cep) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
}

function salvarCadastro() {
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const cep = document.getElementById("cep");
  const address = document.getElementById("address");
  const number = document.getElementById("number");
  const neighborhood = document.getElementById("neighborhood");
  const city = document.getElementById("city");
  const province = document.getElementById("province");

  const cadastro = {
    id: (cadastrados.length + 1),
    name: `${name.value} ${surname.value}`,
    address: `${address.value}, ${number.value}`,
    cep: cep.value,
    neighborhood: neighborhood.value,
    city: city.value,
    province: province.value
  }
  cadastrados.push(cadastro);
  addDataIntoTable(cadastro);
  form.reset();
}

function addDataIntoTable(cadastro) {
  table.innerHTML += `
  <tr>
    <th scope="row">${cadastro.id}</th>
    <td>${cadastro.name}</td>
    <td>${cadastro.address}</td>
    <td>${cadastro.cep}</td>
    <td>${cadastro.neighborhood}</td>
    <td>${cadastro.city}</td>
    <td>${cadastro.province}</td>
  </tr>
  `
}

