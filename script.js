emailjs.init("h_O3-_IMMdSCPxmXF");

let tipoSelecionado = "";

function mostrarFormulario(tipo) {
  tipoSelecionado = tipo;

  // Mostrar formulário
  document.getElementById("formulario").classList.remove("hidden");
  document.querySelector(".buttons").style.display = "none";

  // Configura o título do formulário
  document.getElementById("tipoForm").textContent =
    tipo === "doar" ? "Formulário de Doação" : "Formulário de Solicitação";

  // Esconde a mensagem de sucesso
  const mensagem = document.getElementById("mensagem");
  mensagem.classList.add("hidden");
}

function enviarFormulario(event) {
  event.preventDefault();

  const btnEnviar = event.target.querySelector('button[type="submit"]');
  btnEnviar.disabled = true;

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  const params = {
    tipo: tipoSelecionado === "doar" ? "Doação" : "Solicitação",
    nome,
    telefone,
    endereco,
  };

  const mensagem = document.getElementById("mensagem");
  mensagem.classList.add("hidden");
  mensagem.querySelector("p").textContent = "";

  emailjs
    .send("service_f2o5nm7", "template_c5mcvjq", params)
    .then(() => {
      // Oculta o formulário
      document.getElementById("formulario").classList.add("hidden");

      // Exibe a mensagem de sucesso
      mensagem.querySelector("p").textContent =
        "Formulário enviado com sucesso!";
      mensagem.classList.remove("hidden");

      btnEnviar.disabled = false;
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error);

      mensagem.querySelector("p").textContent =
        "Ocorreu um erro. Tente novamente mais tarde.";
      mensagem.classList.remove("hidden");
      mensagem.style.color = "red";

      btnEnviar.disabled = false;
    });
}

function voltar() {
  // Limpa o formulário e a mensagem
  document.getElementById("formulario").reset();
  document.getElementById("formulario").classList.add("hidden");
  document.getElementById("mensagem").classList.add("hidden");
  document.getElementById("mensagem").style.color = "";
  document.getElementById("mensagem").querySelector("p").textContent = "";

  // Volta para os botões principais
  document.querySelector(".buttons").style.display = "flex";
}
