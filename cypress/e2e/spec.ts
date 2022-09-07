describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Phatak Status')
    if (cy.contains('Phatak Lists')) {
      cy.get('button').contains('Show Form').click()
    }
    if (cy.contains('Add Phatak')) {
      cy.get('button').contains('Submit').click()
      cy.focused().blur()
      cy.contains('Phatak Name is Required')
    }
  })
})
