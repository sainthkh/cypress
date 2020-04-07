context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://demo.spotfire.cloud.tibco.com/spotfire/wp/analysis?file=/Public/Airbnb%20Boston%20Listings')
  })

  it('select chart value', () => {
    cy.wait(6000) // Give time for the chart to render. Ideally, this should wait on the specific HTML element.
    cy.get('div[title="Property Type Distribution"]').parent().parent().parent().click(150, 60) // This click will fail.
  })

  it('select chart value 2', () => {
    cy.get('div[title="Property Type Distribution"]').as('chartTitle').parent().parent().parent()
    .within((el) => {
      cy.get('div.sf-element-canvas-image').invoke('attr', 'sf-busy').should('eq', 'false')
      cy.wrap(el).as('chart').click(150, 60) // This click will fail.
    })
  })
})
