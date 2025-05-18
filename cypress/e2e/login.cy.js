describe('Login Page - Testes Funcionais', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve carregar com aba login ativa', () => {
    cy.get('#login-tab').should('have.class', 'active');
    cy.get('#login').should('be.visible');
  });

  it('deve alternar entre abas login e cadastro', () => {
    cy.get('#register-tab').click();
    cy.get('#register').should('be.visible');
    cy.get('#login').should('not.be.visible');

    cy.get('#login-tab').click();
    cy.get('#login').should('be.visible');
    cy.get('#register').should('not.be.visible');
  });

  it('deve permitir submeter com Enter', () => {
    // Usando credenciais válidas para que a submissão leve à mudança de página
    cy.get('#loginUser').clear().type('administrador');
    cy.get('#loginPassword').clear().type('master{enter}');

    // Verifica se a URL redireciona para o endereço esperado (por exemplo, admin.html)
    cy.url().should('include', 'admin.html');
  });

  it('deve mostrar erro se login inválido for submetido', () => {
    // Testa com credenciais inválidas
    cy.get('#loginUser').clear().type('usuario_invalido');
    cy.get('#loginPassword').clear().type('senha_invalida');
    cy.get('#loginForm button[type="submit"]').click();

    cy.get('#loginError')
      .should('be.visible')
      .and('contain.text', 'Usuário ou senha inválidos.');
    // Certifica que não houve redirecionamento no caso de erro
    cy.url().should('include', 'login');
  });

  it('campo senha deve estar oculto (tipo password)', () => {
    cy.get('#loginPassword').should('have.attr', 'type', 'password');
  });

  it('campo usuário deve ter foco inicial', () => {
    // Caso você deseje que o input tenha foco ao carregar a página, pode adicionar o atributo "autofocus" no HTML.
    // Se não, ajuste o teste conforme a necessidade.
    cy.focused().should('have.id', 'loginUser');
  });

  it('deve aceitar usuário com até 256 caracteres', () => {
    const longUser = 'a'.repeat(256);
    cy.get('#loginUser').clear().type(longUser).should('have.value', longUser);
  });

  it('deve permitir login válido e validar o texto "VidaPlus" no navbar', () => {
    cy.get('#loginUser').clear().type('administrador');
    cy.get('#loginPassword').clear().type('master');
    cy.get('#loginForm button[type="submit"]').click();

    // Verifica se redirecionou para a página do administrador
    cy.url().should('include', 'admin.html');

    // Verifica a presença do navbar com o texto "VidaPlus"
    // (Pressupondo que a página redirecionada possua essa estrutura)
    cy.get('a.navbar-brand')
      .should('be.visible')
      .and('contain.text', 'VidaPlus');
  });

  it('deve cadastrar um novo usuário e permitir o login em seguida', () => {
    // Troca para aba de cadastro
    cy.get('#register-tab').click();

    cy.get('#registerName').clear().type('Novo Usuário');
    // Gera um email único para evitar duplicidade
    const newEmail = `novo_usuario_${Date.now()}@teste.com`;
    cy.get('#registerEmail').clear().type(newEmail);
    cy.get('#registerPassword').clear().type('senhateste');
    cy.get('#registerConfirm').clear().type('senhateste');
    cy.get('#registerTerms').check();
    cy.get('#registerForm button[type="submit"]').click();

    // Após cadastro bem-sucedido, o sistema muda para a aba de login
    cy.get('#login-tab').should('have.class', 'active');

    // Realiza login com o novo usuário
    cy.get('#loginUser').clear().type(newEmail);
    cy.get('#loginPassword').clear().type('senhateste');
    cy.get('#loginForm button[type="submit"]').click();

    // Usuários cadastrados recebem o papel "paciente" e são redirecionados para a página de pacientes
    cy.url().should('include', 'pacientes.html');
  });

  it('não deve permitir login com usuário válido e senha inválida', () => {
    cy.get('#loginUser').clear().type('administrador');
    cy.get('#loginPassword').clear().type('senhaerrada');
    cy.get('#loginForm button[type="submit"]').click();

    cy.get('#loginError')
      .should('be.visible')
      .and('contain.text', 'Usuário ou senha inválidos.');

    // Verifica que a URL não mudou, permanecendo na página de login
    cy.url().should('include', 'login');
  });
});