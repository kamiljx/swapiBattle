describe('Swapi game tests', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '**people'
    }).as('people');
    cy.intercept({
      method: 'GET',
      url: '**starships'
    }).as('starships');
  })
  it('Default load', () => {
    cy.visit('/')
    cy.get('.mat-mdc-card').should('not.exist');
    cy.get('#play-again').should('not.exist');
    cy.contains('Welcome!')
  })

  it('Check is content loaded on mode set', () => {
    cy.visit('/')
    cy.wait(1000);
    cy.eleClick('people').wait('@people');
    cy.get('.mat-mdc-card').should('exist');
    cy.get('#play-again').should('exist');
  });

  it('Check is content loaded on mode change', () => {
    cy.visit('/')
    cy.wait(1000);
    cy.eleClick('people').wait('@people');
    cy.eleClick('starship').wait('@starships');
    cy.get('.mat-mdc-card').should('exist');
    cy.get('#play-again').should('exist');
  });

  it('Check can play again', () => {
    cy.visit('/')
    cy.wait(1000);
    cy.eleClick('people').wait('@people');
    cy.eleClick('play-again').wait('@people');
  })

})
