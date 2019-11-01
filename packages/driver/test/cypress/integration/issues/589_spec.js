describe('issue 589', () => {
  it('pathname works correctly after redirection', () => {
    cy.visit('/fixtures/issue-589-login.html')
    cy.get('#submit').click()

    cy.location('pathname').should('eq', '/fixtures/issue-589-dashboard.html')
  })
})
