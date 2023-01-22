describe('TestVoorstellingDetail', () => {

    beforeEach(function (){
        cy.visit('https://localhost:44469');
    });

    it('it should redirect to /voorstelling', function (){
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2) > div > a').click()
        cy.url().should('include', '/voorstelling/geselecteerd')
    });

})