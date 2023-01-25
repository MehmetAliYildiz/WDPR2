describe('My First Test', () => {

    beforeEach(function (){
        cy.visit('https://localhost:44469');
    });

    it('it should redirect to /voorstelling', function (){
        cy.get('#navbarKlap > ul > li:nth-child(2) > a').click()
        cy.url().should('include', '/Voorstelling')
    });

    it('searching voorstelling1', function (){
        cy.visit('https://localhost:44469/Voorstelling')
        cy.get('#root > div > div.Zoekveld > input')                // should only be one id "query" on the page
            .type('Voorstelling1')
        cy.contains("Voorstelling1")
    })
    //
    // it('interception', function (){
    //     cy.intercept('POST', '/attractie').as('draai4')
    //     cy.visit('http://localhost:3000/#/attractieToevoegen')
    //     cy.get('#naam').type('draai4')
    //     cy.get('#x').type('5')
    //     cy.get('#y').type('5')
    //     cy.get('.submit-btn').click()
    //     cy.wait('@draai4').its('response.statusCode').should('eq', 201)
    // })
})