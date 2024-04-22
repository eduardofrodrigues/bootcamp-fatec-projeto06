"use strict"

let cepData = ""

const cepField = document.getElementById("cep");
const cepFeedback = document.getElementById("cepFeedback");

$('#cep').mask('00000-000');

cepField.addEventListener("focus", (event) => {
  if ((event.target.value).length < 9) {
    cepFeedback.innerHTML = "Insira um CEP válido!";
    cepField.classList.add("is-invalid");
  }
})

cepField.addEventListener("input", (event) => {
  if ((event.target.value).length == 9) {
    cepField.classList.remove("is-invalid")
  }
  if ((event.target.value).length < 9) {
    cepFeedback.innerHTML = "Insira um CEP válido!";
    cepField.classList.add("is-invalid")
  }
})

function addWrongCepFeedBack() {
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

  address.value = data.logradouro;
  number.removeAttribute("disabled");
  neighborhood.value = data.bairro;
  city.value = data.localidade;
  province.value = data.uf;
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
