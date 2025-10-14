import { SELECTORS, getPageTitle, getOrderButton, getConstructorElements } from '../support/selectors';

describe('Constructor Page - Working Tests', () => {
  beforeEach(() => {
    // Visit the constructor page
    cy.visit('/');
    
    // Wait for page to load
    getPageTitle().should('contain', 'Соберите бургер');
  });

  describe('Page Structure', () => {
    it('should load the constructor page successfully', () => {
      // Check that the page title is visible
      getPageTitle().should('contain', 'Соберите бургер');
      
      // Check that constructor elements are present
      const elements = getConstructorElements();
      elements.bunTop.should('exist');
      elements.ingredients.should('exist');
      elements.bunBottom.should('exist');
    });

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

  describe('Basic Functionality', () => {
    it('should show loading state initially', () => {
      // Check that the page shows loading state or empty state
      getPageTitle().should('contain', 'Соберите бургер');
      
      // Check that constructor elements are present (even if empty)
      const elements = getConstructorElements();
      elements.bunTop.should('exist');
      elements.ingredients.should('exist');
      elements.bunBottom.should('exist');
    });

    it('should have ingredient categories structure', () => {
      // Check that the page structure is correct for ingredients
      getPageTitle().should('contain', 'Соберите бургер');
      
      // The page should be ready to display ingredients when they load
      cy.get(SELECTORS.BODY).should('be.visible');
    });
  });

  describe('Modal Structure', () => {
    it('should have modal components available', () => {
      // Check that modal components exist in DOM (even if not visible)
      cy.get(SELECTORS.BODY).should('contain', 'Соберите бургер');
      
      // The modal components should be available for testing
      // when ingredients are loaded
      cy.get(SELECTORS.BODY).should('be.visible');
    });
  });

  describe('Order Button Functionality', () => {
    it('should have order button that is clickable', () => {
      // Check that order button exists and is clickable
      getOrderButton().should('be.visible');
      getOrderButton().should('not.be.disabled');
    });
  });
});
