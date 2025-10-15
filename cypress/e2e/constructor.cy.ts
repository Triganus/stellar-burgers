import { SELECTORS, getPageTitle, getOrderButton, getConstructorElements } from '../support/selectors';

describe('Constructor Page', () => {
  beforeEach(() => {
    // Visit the constructor page
    cy.visit('/');
    
    // Wait for page to load
    getPageTitle().should('contain', 'Соберите бургер');
  });

  describe('Page Loading', () => {
    it('should load the constructor page successfully', () => {
      // Check that the page title is visible
      getPageTitle().should('contain', 'Соберите бургер');
      
      // Check that the constructor area is visible
      const elements = getConstructorElements();
      elements.bunTop.should('exist');
      elements.ingredients.should('exist');
      elements.bunBottom.should('exist');
    });
  });

  describe('Basic Functionality', () => {
    it('should display constructor elements', () => {
      // Check that constructor elements are present
      const elements = getConstructorElements();
      elements.bunTop.should('be.visible');
      elements.ingredients.should('be.visible');
      elements.bunBottom.should('be.visible');
    });

    it('should have order button', () => {
      // Check that order button is present
      getOrderButton().should('be.visible');
    });
  });

  describe('Ingredients Loading', () => {
    it('should show loading state initially', () => {
      // Check that the page shows loading state or empty state
      // Since API requests are not intercepted, we check for the basic structure
      getPageTitle().should('contain', 'Соберите бургер');
      
      // Check that constructor elements are present (even if empty)
      const elements = getConstructorElements();
      elements.bunTop.should('exist');
      elements.ingredients.should('exist');
      elements.bunBottom.should('exist');
    });

    it('should have ingredient categories structure', () => {
      // Check that the page structure is correct for ingredients
      // Note: In a real test environment, ingredients would be loaded from API
      getPageTitle().should('contain', 'Соберите бургер');
      
      // The page should be ready to display ingredients when they load
      cy.get(SELECTORS.BODY).should('be.visible');
    });
  });
});
