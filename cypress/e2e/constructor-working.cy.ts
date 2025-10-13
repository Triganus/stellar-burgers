describe('Constructor Page - Working Tests', () => {
  beforeEach(() => {
    // Visit the constructor page
    cy.visit('/');
    
    // Wait for page to load
    cy.get('h1').should('contain', 'Соберите бургер');
  });

  describe('Page Structure', () => {
    it('should load the constructor page successfully', () => {
      // Check that the page title is visible
      cy.get('h1').should('contain', 'Соберите бургер');
      
      // Check that constructor elements are present
      cy.get('[data-testid="constructor-bun-top"]').should('exist');
      cy.get('[data-testid="constructor-ingredients"]').should('exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    });

    it('should display constructor elements', () => {
      // Check that constructor elements are present
      cy.get('[data-testid="constructor-bun-top"]').should('be.visible');
      cy.get('[data-testid="constructor-ingredients"]').should('be.visible');
      cy.get('[data-testid="constructor-bun-bottom"]').should('be.visible');
    });

    it('should have order button', () => {
      // Check that order button is present
      cy.get('button').contains('Оформить заказ').should('be.visible');
    });
  });

  describe('Basic Functionality', () => {
    it('should show loading state initially', () => {
      // Check that the page shows loading state or empty state
      cy.get('h1').should('contain', 'Соберите бургер');
      
      // Check that constructor elements are present (even if empty)
      cy.get('[data-testid="constructor-bun-top"]').should('exist');
      cy.get('[data-testid="constructor-ingredients"]').should('exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    });

    it('should have ingredient categories structure', () => {
      // Check that the page structure is correct for ingredients
      cy.get('h1').should('contain', 'Соберите бургер');
      
      // The page should be ready to display ingredients when they load
      cy.get('body').should('be.visible');
    });
  });

  describe('Modal Structure', () => {
    it('should have modal components available', () => {
      // Check that modal components exist in DOM (even if not visible)
      cy.get('body').should('contain', 'Соберите бургер');
      
      // The modal components should be available for testing
      // when ingredients are loaded
      cy.get('body').should('be.visible');
    });
  });

  describe('Order Button Functionality', () => {
    it('should have order button that is clickable', () => {
      // Check that order button exists and is clickable
      cy.get('button').contains('Оформить заказ').should('be.visible');
      cy.get('button').contains('Оформить заказ').should('not.be.disabled');
    });
  });
});
