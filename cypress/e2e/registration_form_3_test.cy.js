beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
   BONUS TASK: add visual tests for registration form 3
   Task list:
   * Test suite for visual tests for registration form 3 is already created
   * Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
   * email format
*/          

describe('Visaul Tests for:Registration form 3', () => {
    it('Check that logo has correct imgage and size', () => {
        // Test for checking that the Cerebrum Hub logo is correct and has the correct size
        cy.get('[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('[data-testid="picture"]').should('be.visible')
        cy.get('[data-testid="picture"]').invoke('height').should('be.lessThan', 167).and('be.greaterThan', 165)
        cy.get('[data-testid="picture"]').invoke('width').should('be.lessThan', 179).and('be.greaterThan', 177) 
        
    });

    it('Check that Country dropdown window is correct and each Country has correct Citys', () => {
        // Verify that the dropdown has 3 choices
        cy.get('#country').find('option').should('have.length', 4)

        // Verify all dropdown values - To fix: Empty value box in country dropdown
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

        // Verify each country has correct citys in options - To fix: Empty value box in each countrys citys
        // Spain
        cy.get('#country').select('Spain')
        cy.get('#city').find('option').should('have.length', 5)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
        
        // Estonia
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
       
        // Austria
        cy.get('#country').select('Austria')
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

    });

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    
    it('Check that checkbox list is correct', () => {
        // Create test similar to previous one verifying checkboxes
        cy.get('input[type="checkbox"]').should('have.length', 2)

        //Verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        
        // Verify that multiple checkboxes can be checked
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    })

    it('Check that wrong email format gives out error message', () => {
        // Type invalid email and assert that error message is visible
        cy.get('input[name="email"]').type('Sassgmail.com')
        cy.get('#emailAlert').should('be.visible').should('contain', 'Email is required.')

        // Type in correct email and assert that error message is not visible
        cy.get('input[name="email"]').clear().type('Sass@gmail.com')
        cy.get('#emailAlert').should('not.be.visible')
    })
});
   /*
   BONUS TASK: add functional tests for registration form 3
   Task list:
    * Create second test suite for functional tests
   * Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
    */

   describe('Functional Tests for:Registration form 3', () => {
    it('Check you can submit successfully when filling all fields', () => {
  
      // Fill in all fields
      cy.get('#name').type('SassV')
      cy.get('.email').type('Sass@gmail.com')
      cy.get('#country').select('Spain')
      cy.get('#city').select('Madrid')
      cy.get('input[type="date"]').eq(0).type('2000-01-01')
      cy.get('input[value="Weekly"]').check()
      cy.get('input[name="birthday"]').type('1995-05-05')
      cy.get('input[type="checkbox"]').check()
  
      // Submit the form
      cy.get('form').submit()
  
      // Verify success message
      cy.get('h1').should('contain', 'Submission received')
    });

    it('Check you can submit successfully when filling only mandatory fields', () => {
        // Fill in only mandatory fields
        cy.get('#name').type('John Doe')
        cy.get('.email').type('Sass@gmail.com')
        cy.get('#country').select('Spain')
    
        // Submit the form
        cy.get('form').submit()
    
        // Verify success message
        cy.get('h1').should('contain', 'Submission received')
      
    });
    
    it('Try submitting from with mandatory fields absent', () => {
        // Submit the form without filling mandatory fields
        cy.get('[onclick="postYourAdd()"]').should('be.disabled')

      });

    it('If city is already chosen and country is updated, then city choice should be removed', () => {
        // Choose Country and City
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')

        // Choose new Country check if previously selected City is removed
        cy.get('#country').select('Spain')
        cy.get('#city').should('not.be.checked')

    });

   
  
       
   
  });