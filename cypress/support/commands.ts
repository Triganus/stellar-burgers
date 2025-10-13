/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  // Set fake tokens in localStorage and cookies
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'fake-refresh-token');
  });
  
  cy.setCookie('accessToken', 'fake-access-token');
});

// Custom commands can be added here if needed

export {};
