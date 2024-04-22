const cepField = document.getElementById("cep");

$('#cep').mask('00000-000');

cepField.addEventListener("focus", (event) => {
  if ((event.target.value).length < 9) {
    cepField.classList.add("is-invalid");
  }
})

cepField.addEventListener("input", (event) => {
  if ((event.target.value).length == 9) {
    cepField.classList.remove("is-invalid")
  }
  if ((event.target.value).length < 9) {
    cepField.classList.add("is-invalid")
  }
})

cepField.addEventListener("blur", (event) => {
  const cep = (event.target.value).replace("-", "");
})
