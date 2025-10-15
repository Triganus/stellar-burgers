// Cypress selectors constants
// This file contains all frequently used selectors to avoid duplication

export const SELECTORS = {
  // Page elements
  PAGE_TITLE: 'h1',
  BODY: 'body',
  
  // Constructor elements
  CONSTRUCTOR_BUN_TOP: '[data-testid="constructor-bun-top"]',
  CONSTRUCTOR_INGREDIENTS: '[data-testid="constructor-ingredients"]',
  CONSTRUCTOR_BUN_BOTTOM: '[data-testid="constructor-bun-bottom"]',
  
  // Buttons
  ORDER_BUTTON: 'button',
  ORDER_BUTTON_TEXT: 'Оформить заказ',
} as const;

// Helper functions for common selectors
export const getOrderButton = () => cy.get(SELECTORS.ORDER_BUTTON).contains(SELECTORS.ORDER_BUTTON_TEXT);
export const getPageTitle = () => cy.get(SELECTORS.PAGE_TITLE);
export const getConstructorElements = () => ({
  bunTop: cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP),
  ingredients: cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS),
  bunBottom: cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM),
});
