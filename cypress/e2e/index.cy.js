describe('Página Vida Plus - /index', () => {
  beforeEach(() => {
    cy.visit('/index'); // Ajuste para o caminho correto do seu servidor
  });

  it('Deve carregar o título correto da página', () => {
    cy.title().should('eq', 'Vida Plus - Sistema de Gestão Hospitalar');
  });

  it('Deve exibir o navbar com o nome VidaPlus e links corretos', () => {
    cy.get('.navbar-brand').should('contain.text', 'VidaPlus');

    // Verifica os links do menu
    cy.get('.navbar-nav .nav-link').then(links => {
      const texts = [...links].map(link => link.textContent.trim());
      expect(texts).to.include.members([
        'Início',
        'Sobre',
        'Especialidades',
        'Equipe médica',
        'Infraestrutura',
        'Contato',
        'Sair'
      ]);
    });
  });

  it('Deve mostrar o texto de boas-vindas na seção "inicio"', () => {
    cy.get('#inicio h1').should('contain.text', 'Bem-vindo ao Vida Plus');
    cy.get('#inicio p').should('contain.text', 'Seu parceiro em gestão hospitalar eficiente e inovadora.');
    cy.get('#inicio a.btn-primary').should('have.attr', 'href', '#sobre');
  });

  it('Deve conter a seção Sobre com o título correto e texto', () => {
    cy.get('#sobre h2').should('contain.text', 'Sobre Nós');
    cy.get('#sobre p').should('have.length.at.least', 3);
    cy.get('#sobre img').should('have.attr', 'alt').and('include', 'Sobre o VidaPlus');
  });

  it('Deve conter cards de especialidades', () => {
    cy.get('#especialidades .card').should('have.length.at.least', 3);
    cy.get('#especialidades .card-title').first().should('contain.text', 'Clínica Médica');
  });

  it('Deve permitir abrir e fechar o menu hamburguer no mobile', () => {
    // Simula tela mobile para testar menu hamburguer
    cy.viewport('iphone-6');
    cy.get('.navbar-toggler').click();
    cy.get('#navbarNav').should('have.class', 'show');
    cy.get('.navbar-toggler').click();
    cy.get('#navbarNav').should('not.have.class', 'show');
  });

  it('Deve ter footer com texto de direitos autorais', () => {
    cy.get('footer').should('be.visible');
    cy.get('footer p').should('contain.text', 'VidaPlus');
  });
});
