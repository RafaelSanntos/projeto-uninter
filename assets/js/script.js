document.addEventListener("DOMContentLoaded", function () {
  console.log("Script carregado!");

  /* ===== LOGIN ===== */
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  // Usuários predefinidos
  const usuariosPredefinidos = [
    { login: "pac_ester.ribeiro", senha: "paciente123", role: "paciente" },
    { login: "enf_marcos.silva", senha: "enf123", role: "enfermeiro" },
    { login: "med_maria.lira", senha: "medico123", role: "medico" },
    { login: "administrador", senha: "master", role: "administrador" },
  ];

  // Função para obter os usuários cadastrados do localStorage
  const obterUsuariosCadastrados = () => {
    const usuariosCadastrados = localStorage.getItem("usuariosCadastrados");
    return usuariosCadastrados ? JSON.parse(usuariosCadastrados) : [];
  };

  // Combina os usuários predefinidos com os cadastrados
  const getUsuarios = () => usuariosPredefinidos.concat(obterUsuariosCadastrados());

  function validarUsuario(login, senha) {
    const usuarios = getUsuarios();
    return usuarios.find((user) => user.login === login && user.senha === senha);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const loginInput = document.getElementById("loginUser").value.trim();
      const senhaInput = document.getElementById("loginPassword").value.trim();

      const usuarioValido = validarUsuario(loginInput, senhaInput);
      if (usuarioValido) {
        loginError.classList.add("d-none"); // Oculta a mensagem de erro
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

        // Redirecionamento conforme o papel do usuário
        switch (usuarioValido.role) {
          case "administrador":
            window.location.href = "admin.html";
            break;
          case "medico":
          case "enfermeiro":
            window.location.href = "profissionais.html";
            break;
          case "paciente":
            window.location.href = "pacientes.html";
            break;
          default:
            console.error("Erro: Papel de usuário desconhecido.");
        }
      } else {
        loginError.textContent = "Usuário ou senha inválidos.";
        loginError.classList.remove("d-none"); // Exibe a mensagem de erro
      }
    });
  }

  /* ===== CADASTRO ===== */
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const senha = document.getElementById("registerPassword").value;
      const confirmSenha = document.getElementById("registerConfirm").value;

      // Validações básicas
      if (senha !== confirmSenha) {
        alert("As senhas não conferem.");
        return;
      }
      if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres.");
        return;
      }

      // Cria novo usuário (usando o email como login)
      const novoUsuario = {
        login: email,
        senha: senha,
        role: "paciente", // Papel padrão para usuários cadastrados
        nome: nome,
      };

      // Obtém os usuários já cadastrados e verifica se o email já existe
      const usuariosCadastrados = obterUsuariosCadastrados();
      if (usuariosCadastrados.find((u) => u.login === novoUsuario.login)) {
        alert("Já existe um usuário com este email.");
        return;
      }

      // Adiciona o novo usuário e salva no localStorage
      usuariosCadastrados.push(novoUsuario);
      localStorage.setItem("usuariosCadastrados", JSON.stringify(usuariosCadastrados));

      alert("Cadastro realizado com sucesso! Agora realize o login.");
      registerForm.reset();

      // Troca para a aba de login após o cadastro bem-sucedido
      const loginTab = document.getElementById("login-tab");
      const tab = new bootstrap.Tab(loginTab);
      tab.show();
    });
  }
});
