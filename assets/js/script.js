document.addEventListener('DOMContentLoaded', function () {
    console.log("Script carregado!");

    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    if (!loginForm) {
        console.error("Erro: Formulário de login não encontrado.");
        return;
    }

    const usuarios = [
        { login: 'pac_ester.ribeiro', senha: 'paciente123', role: 'paciente' },
        { login: 'enf_marcos.silva', senha: 'enf123', role: 'enfermeiro' },
        { login: 'med_maria.lira', senha: 'medico123', role: 'medico' },
        { login: 'administrador', senha: 'master', role: 'administrador' }
    ];

    function validarUsuario(login, senha) {
        return usuarios.find(user => user.login === login && user.senha === senha);
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        console.log("Formulário de login enviado!");

        const loginInput = document.getElementById('loginUser').value.trim();
        const senhaInput = document.getElementById('loginPassword').value.trim();

        console.log("Tentativa de login:", loginInput, senhaInput);

        const usuarioValido = validarUsuario(loginInput, senhaInput);

        if (usuarioValido) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
            loginError.style.display = 'none'; // Esconde a mensagem de erro
            console.log(`Login bem-sucedido como ${usuarioValido.role}! Redirecionando...`);

            // Adicionando um log antes do redirecionamento
            console.log("Redirecionando para a página...");
            switch (usuarioValido.role) {
                case 'administrador':
                    window.location.href = 'admin.html';
                    break;
                case 'medico':
                case 'enfermeiro':
                    window.location.href = 'profissionais.html';
                    break;
                case 'paciente':
                    window.location.href = 'pacientes.html';
                    break; // Este é o único 'default' na estrutura switch
                default:
                    console.error("Erro: Papel de usuário desconhecido.");
            }
        } else {
            loginError.textContent = 'Usuário ou senha inválidos.';
            loginError.style.display = 'block'; // Exibe a mensagem de erro
            console.error("Falha no login: Usuário ou senha incorretos.");
        }
    });
});
