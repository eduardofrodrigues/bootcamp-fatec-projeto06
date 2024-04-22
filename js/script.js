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

cepField.addEventListener("blur", async (event) => {
  const cep = (event.target.value).replace("-", "");
  if (cep.length === 9) {
    const response = await getCEP(cep);
  }
})

async function getCEP(cep) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
}
