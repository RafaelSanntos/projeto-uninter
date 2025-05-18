describe('Página Admin - Vida Plus', () => {
  beforeEach(() => {
    // Acessa a rota /admin antes de cada teste
    cy.visit('/admin');
  });

  it('Deve carregar a página admin corretamente', () => {
    // Verifica se o título da página está correto
    cy.title().should('include', 'Vida Plus - Sistema de Gestão Hospitalar');

    // Verifica se o header contém o nome da marca
    cy.get('.navbar-brand').should('contain.text', 'VidaPlus');
  });

  it('Deve exibir o título principal do portal admin', () => {
    cy.get('.hero-admin h1').should('contain.text', 'Portal do Administrador');
    cy.get('.hero-admin p.lead').should('contain.text', 'Gerenciamento completo do sistema hospitalar.');
  });

  it('Deve listar funcionalidades administrativas com botões', () => {
    cy.get('section.container.py-5')
      .eq(0) // primeira seção funcionalidade administrativa
      .within(() => {
        cy.contains('Gerenciar Cadastros').should('be.visible');
        cy.get('a.btn-primary').should('contain.text', 'Novo Cadastro');
        cy.get('a.btn-secondary').should('contain.text', 'Editar Cadastro');
        cy.get('a.btn-danger').should('contain.text', 'Excluir Cadastro');
      });

    cy.get('section.container.py-5')
      .eq(1)
      .within(() => {
        cy.contains('Controlar Fluxo de Internações').should('be.visible');
        cy.get('a.btn-primary').should('contain.text', 'Nova Internação');
        cy.get('a.btn-info').should('contain.text', 'Transferir Paciente');
        cy.get('a.btn-success').should('contain.text', 'Dar Alta');
      });

    cy.get('section.container.py-5')
      .eq(2)
      .within(() => {
        cy.contains('Gerar Relatórios').should('be.visible');
        cy.get('a.btn-warning').should('contain.text', 'Gerar Relatório');
        cy.get('a.btn-outline-secondary').should('contain.text', 'Exportar Relatório');
      });
  });

  it('Deve exibir seção de segurança com badges de implementado', () => {
    cy.contains('Segurança').should('be.visible');

    cy.get('.security-feature').eq(0).within(() => {
      cy.contains('Criptografia de Dados Sensíveis');
      cy.get('.badge.bg-success').should('contain.text', 'Implementado');
    });

    cy.get('.security-feature').eq(1).within(() => {
      cy.contains('Controle de Acesso por Perfil');
      cy.get('.badge.bg-success').should('contain.text', 'Implementado');
    });

    cy.get('.security-feature').eq(3).within(() => {
      cy.contains('Conformidade com a LGPD');
      cy.get('a.btn-outline-info').should('contain.text', 'Ver Políticas LGPD');
    });
  });

  it('Deve exibir tabela de agendamentos com dados corretos', () => {
    cy.get('section.container.py-5').contains('Gerenciamento de Agendamentos');

    cy.get('table.table').within(() => {
      cy.get('thead tr th').should('have.length', 8); // 8 colunas
      cy.get('tbody tr').should('have.length.at.least', 2); // pelo menos 2 linhas

      // Verifica primeira linha
      cy.get('tbody tr').first().within(() => {
        cy.get('td').eq(0).should('contain.text', '101'); // ID
        cy.get('td').eq(1).should('contain.text', 'Mariana Costa'); // Paciente
        cy.get('td').eq(6).find('span.badge.bg-primary').should('contain.text', 'Confirmado');
      });
    });
  });

  it('Botão Sair deve direcionar para login', () => {
    cy.get('.nav-link').contains('Sair').should('have.attr', 'href', 'login.html');
  });

  // Teste opcional: testar se o menu hamburguer funciona no mobile simulando
  it('Menu hamburguer deve ser clicável e abrir o menu', () => {
    cy.viewport('iphone-6');
    cy.get('.navbar-toggler').click();
    cy.get('#navbarNav.collapse.show').should('exist');
  });
});
