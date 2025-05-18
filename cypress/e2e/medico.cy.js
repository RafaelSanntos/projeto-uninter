describe('Validação do Portal do Médico', () => {
  beforeEach(() => {
    cy.visit('/medico');
  });

  it('Deve mostrar o título do portal e mensagem de boas-vindas', () => {
    cy.get('section#inicio h1').should('contain.text', 'Portal do Médico');
    cy.get('section#inicio h3').should('contain.text', 'Bom dia, Sr. João!');
  });

  it('Deve conter os botões de Acesso Rápido', () => {
    const botoes = [
      'Novo Paciente',
      'Prescrever',
      'Solicitar Exame',
      'Mensagens'
    ];

    cy.get('section.py-5.bg-white .btn-custom').should('have.length', 4)
      .each(($btn, index) => {
        cy.wrap($btn).should('contain.text', botoes[index]);
      });
  });

  it('Deve conter entradas corretas na Agenda do Dia', () => {
    cy.get('section#agenda table tbody tr').should('have.length', 4);

    // Validar o primeiro paciente da agenda
    cy.get('section#agenda table tbody tr').eq(0).within(() => {
      cy.get('td').eq(1).should('contain.text', 'Ana Paula Souza');
      cy.get('td').eq(0).should('contain.text', '08:30');
    });
  });

  it('Deve listar pacientes na seção Pacientes', () => {
    cy.get('section#pacientes table tbody tr').should('have.length', 3);

    cy.get('section#pacientes table tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('contain.text', 'Ricardo Alves');
      cy.get('td').eq(1).should('contain.text', '28/03/1992');
    });
  });

  it('Deve mostrar os cards do Resumo Diário com valores corretos', () => {
    const resumo = [
      { titulo: 'Consultas', valor: '12' },
      { titulo: 'Novos Pacientes', valor: '4' },
      { titulo: 'Exames Solicitados', valor: '8' },
      { titulo: 'Mensagens', valor: '3' },
    ];

    cy.get('section#resumo .card').should('have.length', 4)
      .each(($card, index) => {
        cy.wrap($card).find('h5').should('contain.text', resumo[index].titulo);
        cy.wrap($card).find('p.display-6').should('contain.text', resumo[index].valor);
      });
  });
});
