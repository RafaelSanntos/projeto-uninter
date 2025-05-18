describe('Tela de Agendamento VidaPlus', () => {
  beforeEach(() => {
    // Ajuste a URL para onde está rodando sua aplicação / arquivo local
    cy.visit('/agendar'); 
  });

  it('Deve carregar a página com título correto', () => {
    cy.title().should('eq', 'Agendamento - VidaPlus');
  });

  it('Deve exibir o formulário com todos os campos', () => {
    cy.get('h1').contains('Agende sua Consulta');
    cy.get('form').should('be.visible');

    cy.get('#specialty').should('be.visible').and('have.value', '');
    cy.get('#doctor').should('be.visible').and('have.value', '');
    cy.get('#date').should('be.visible').and('have.value', '');
    cy.get('#time').should('be.visible').and('have.value', '');
    cy.get('#appointmentType').should('be.visible').and('have.value', '');

    cy.get('button[type="submit"]').should('contain.text', 'Agendar').and('be.visible');
  });

  it('Deve permitir preencher o formulário e submeter', () => {
    cy.get('#specialty').select('Cardiologia');
    cy.get('#doctor').select('Dr. João Miguel Abreu (Cardiologista)');
    
    // Para data, escolhe hoje
    const today = new Date().toISOString().split('T')[0];
    cy.get('#date').type(today);

    cy.get('#time').select('08:00');
    cy.get('#appointmentType').select('Consulta');

    cy.get('button[type="submit"]').click();

    // Aqui você pode colocar um stub de alert, modal ou comportamento pós-submit
    // Por exemplo, se der um alert, você pode interceptar:
    // cy.on('window:alert', (txt) => {
    //   expect(txt).to.contains('Agendamento realizado');
    // });

    // Como o form não tem ação, só validamos se clicou sem erro
  });
});
