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
        cy.get('#login_campo').type('usuario_teste');
        cy.get('#senha_campo').type('senha_teste{enter}');
        // Verificar comportamento esperado após submit
    });

    it('deve mostrar erro se campos vazios e submit', () => {
        cy.get('#login button[type="submit"]').click();
        cy.get('#login_campo:invalid').should('exist');
        cy.get('#senha_campo:invalid').should('exist');
    });

    it('campo senha deve estar oculto', () => {
        cy.get('#senha_campo').should('have.attr', 'type', 'password');
    });

    it('campo usuário deve ter foco inicial', () => {
        cy.focused().should('have.id', 'login_campo');
    });

    it('deve aceitar usuário com até 256 caracteres', () => {
        const longUser = 'a'.repeat(256);
        cy.get('#login_campo').type(longUser).should('have.value', longUser);
    });

    it('deve permitir login válido e validar o texto VidaPlus no navbar', () => {
    cy.get('#login_campo').type('administrador');
    cy.get('#senha_campo').type('master');
    cy.get('button.btn.btn-primary').click();

    cy.get('a.navbar-brand').should('be.visible')
        .and('contain.text', 'VidaPlus');
    });
});
