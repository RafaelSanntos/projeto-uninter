describe('Página Paciente - VidaPlus', () => {
  beforeEach(() => {
    cy.visit('/pacientes');
  });

  it('Deve exibir o navbar com logo e link de sair', () => {
    cy.get('nav.navbar').should('exist');
    cy.get('a.navbar-brand')
      .should('contain.text', 'VidaPlus')
      .and('have.attr', 'href', 'index.html');
    cy.get('ul.navbar-nav').within(() => {
      cy.contains('a.nav-link', 'Sair')
        .should('have.attr', 'href', 'login.html')
        .find('i.bi-box-arrow-right')
        .should('exist');
    });
  });

  it('Deve exibir a seção hero com títulos e texto de saudação', () => {
    cy.get('section.hero-patient').within(() => {
      cy.get('h1').should('contain.text', 'Portal do Paciente');
      cy.get('h3').should('contain.text', 'Bom dia, Rafael!');
      cy.get('p').first().should('contain.text', 'Gerencie sua saúde de forma fácil e segura.');
      cy.get('p.fw-bold').should('contain.text', 'Rafael Antonio Silva dos Santos – RU: 4332113');
    });
  });

  it('Deve exibir seção Perfil do Paciente com todos os dados corretos', () => {
    cy.get('#perfil').within(() => {
      cy.get('h2').should('contain.text', 'Perfil do Paciente');
      cy.get('ul.list-group li').should('have.length', 10);

      cy.contains('li', 'Nome: Ester Ribeiro da Rocha').should('exist');
      cy.contains('li', 'Nascimento: 14/01/1999').should('exist');
      cy.contains('li', 'CPF: 486.626.486-59').should('exist');
      cy.contains('li', 'RG: 33.176.919-0').should('exist');
      cy.contains('li', 'Endereço: Travessa João Eugênio de Macedo, 155, Ipê II, Pindamonhangaba - SP').should('exist');
      cy.contains('li', 'Telefone: (12) 99645-6890').should('exist');
      cy.contains('li', 'Email: esterribeirodarocha87@gmail.com').should('exist');
      cy.contains('li', 'Tipo Sanguíneo: AB-').should('exist');
      cy.contains('li', 'Alergias: Rinite alérgica').should('exist');
      cy.contains('li', 'Histórico de Doenças: Sem histórico').should('exist');

      cy.get('button.btn-outline-primary').should('contain.text', 'Editar Perfil');
      cy.get('button.btn-outline-primary i.bi-pencil-square').should('exist');
    });
  });

  it('Deve exibir o Histórico de Consultas com um item aberto', () => {
    cy.get('#historico').within(() => {
      cy.get('h2').should('contain.text', 'Histórico de Consultas');
      cy.get('.accordion-item').should('have.length', 1);
      cy.get('.accordion-item').first().within(() => {
        cy.get('button.accordion-button').should('contain.text', 'Clínica Médica - Dr. José Claudio Zanrini');
        cy.get('.accordion-collapse.collapse.show').within(() => {
          cy.contains('p', 'Data: 13/05/2023').should('exist');
          cy.contains('p', 'Motivo: Consulta de rotina').should('exist');
          cy.contains('p', 'Diagnóstico: Boa saúde geral').should('exist');
          cy.contains('p', 'Prescrição: Nenhuma').should('exist');
          cy.contains('p', 'Observações: Agendar retorno para 13/11/2023').should('exist');
        });
      });
    });
  });

  it('Deve exibir Resultados de Exames com itens corretos', () => {
    cy.get('#resultado').within(() => {
      cy.get('h2').should('contain.text', 'Resultados de Exames');
      cy.get('ul.list-group li').should('have.length', 2);

      cy.contains('li', 'Hemograma Completo - 10/03/2023').within(() => {
        cy.get('span.badge.bg-success').should('contain.text', 'Liberado');
        cy.get('a.btn-success').should('contain.text', 'Download').and('have.attr', 'href', '#');
      });

      cy.contains('li', 'Radiografia do Tórax - 22/05/2024').within(() => {
        cy.get('span.badge.bg-warning').should('contain.text', 'Em análise');
        cy.get('button[disabled]').should('contain.text', 'Aguardando');
      });
    });
  });

  it('Deve exibir Prescrições Médicas com dados corretos e botão imprimir', () => {
    cy.get('#atestado').within(() => {
      cy.get('h2').should('contain.text', 'Prescrições Médicas');
      cy.get('.prescription-card').within(() => {
        cy.get('h5').should('contain.text', '10/03/2025');
        cy.contains('p', 'Médico: Dr. José Claudio Zanrini').should('exist');
        cy.get('ul li').should('have.length', 2);
        cy.get('ul li').eq(0).should('contain.text', 'Paracetamol 500mg');
        cy.get('ul li').eq(1).should('contain.text', 'Aumentar ingestão de líquidos');
        cy.contains('p', 'Observações: Se persistirem os sintomas, retornar ao médico').should('exist');
        cy.get('button.btn-outline-secondary').should('contain.text', 'Imprimir');
      });
    });
  });

  it('Deve exibir seção Internação com alerta e mensagem correta', () => {
    cy.get('#internacao').within(() => {
      cy.get('h2').should('contain.text', 'Internação');
      cy.get('.alert.alert-info').should('contain.text', 'Nenhuma internação ativa no momento.');
    });
  });

  it('Deve exibir Telemedicina com botão de agendamento', () => {
    cy.get('#telemedicina').within(() => {
      cy.get('h2').should('contain.text', 'Telemedicina');
      cy.get('.card-title').should('contain.text', 'Agende sua consulta online');
      cy.get('.card-text').should('contain.text', 'Realize consultas médicas no conforto da sua casa');
      cy.get('a.btn-primary').should('contain.text', 'Agendar Teleconsulta').and('have.attr', 'href', '#');
    });
  });

  it('Deve exibir Questionário de Satisfação com link para responder', () => {
    cy.get('#questionario').within(() => {
      cy.get('h2').should('contain.text', 'Questionário de Satisfação');
      cy.get('p').should('contain.text', 'Sua opinião é essencial');
      cy.get('a.btn-info').should('contain.text', 'Responder Questionário').and('have.attr', 'href', '#');
    });
  });

  it('Deve exibir o footer com dados do paciente e copyright', () => {
    cy.get('footer').within(() => {
      cy.contains('p', 'Rafael Antonio Silva dos Santos – RU: 4332113').should('exist');
      cy.contains('p', '© VidaPlus - Sistema de Gestão Hospitalar').should('exist');
    });
  });
});
