describe('Página Contato - VidaPlus', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('Deve carregar a página e exibir o título correto', () => {
    cy.get('.hero-page h1').should('contain.text', 'Fale Conosco')
    cy.get('.hero-page .lead').should('contain.text', 'Estamos aqui para te ajudar')
  })

  it('Deve mostrar as informações de contato', () => {
    cy.get('.contact-info').should('be.visible')
    cy.contains('Telefone:').should('exist')
    cy.contains('(12) 3645-4875').should('exist')
    cy.contains('Email:').should('exist')
    cy.contains('contato@vidaplus.com.br').should('exist')
    cy.contains('Endereço:').should('exist')
  })

  it('Deve mostrar os horários de atendimento', () => {
    cy.contains('Segunda a Sexta:').should('exist')
    cy.contains('08h às 18h').should('exist')
    cy.contains('Sábados:').should('exist')
    cy.contains('08h às 12h').should('exist')
    cy.contains('Domingos e Feriados:').should('exist')
    cy.contains('Fechado').should('exist')
  })

  it('Deve exibir o formulário de contato com todos os campos', () => {
    cy.get('form').should('be.visible')
    cy.get('input#name').should('exist').and('have.attr', 'placeholder', 'Seu nome')
    cy.get('input#email').should('exist').and('have.attr', 'placeholder', 'Seu email')
    cy.get('input#subject').should('exist').and('have.attr', 'placeholder', 'Assunto da mensagem')
    cy.get('textarea#message').should('exist').and('have.attr', 'placeholder', 'Digite sua mensagem...')
    cy.get('button[type="submit"]').should('contain.text', 'Enviar Mensagem')
  })

  it('Deve permitir preencher o formulário e enviar', () => {
    cy.get('input#name').type('Rafael Santos')
    cy.get('input#email').type('rafael@example.com')
    cy.get('input#subject').type('Teste de contato')
    cy.get('textarea#message').type('Mensagem de teste enviada pelo Cypress.')
    cy.get('form').submit()

    // Como não tem backend real, só checamos se o submit foi acionado
    // Se tiver alert ou redirecionamento, pode adaptar aqui
  })

  it('Deve exibir o mapa de localização', () => {
    cy.get('.map-container iframe').should('be.visible')
      .and('have.attr', 'src').and('include', 'maps.app.goo.gl')
  })
})
