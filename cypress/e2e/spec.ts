describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.contains('Phatak Status')
    // if (cy.contains('Phatak Lists').) {
    //   cy.get('button').contains('Show Form').click()
    // }
    if (cy.contains('Add Phatak')) {
      cy.get('button').contains('Submit').click()
      cy.focused().blur()
      cy.contains('Phatak Name is Required')
      cy.scrollTo('top')
      cy.get('input[formcontrolname="phatakName"]').type('Rajiv Chowk Railway Crossing',{force: true})
      cy.get('button').contains('Submit').click()
      cy.focused().blur()
      cy.contains('Phone Number is Required')
    }
  })
})
