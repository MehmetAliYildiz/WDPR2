describe('template spec', () => {
    it('passes', () => {
        const text = "Dit is een voorbeeld";
        cy.visit('https://localhost:44469');

        cy.get("[data-cy='reserveer-knop']")
            .click();

        cy.get("[data-cy='zaal-lijst']")
            .find("button")
            .first()
            .click();

        cy.get("[data-cy='scheduler']")
            .find("[data-cy='scheduler-content']")
            .within(($schedulerContent) => {
                cy.get("button").eq(4).click();
            });

        cy.get("[data-cy='appointment-form']")
            .find("input")
            .type(text)
            .get("[data-cy='create-appointment-button']")
            .click();

        cy.get("[data-cy='appointments']")
            .within(($appointments) => {
                cy.get("button").eq(1)
                    .find("h2")
                    .contains(text);
            });
    })
})