import authorizationPage from "../support/pages/AuthorizationPage";
import homePage from "../support/pages/HomePage";
import user from "../fixtures/user.json"
import { loginViaAPI } from "../support/helper";

it('Authorization', () => {
  
  cy.log('Authorize user');
  authorizationPage.visit();
  authorizationPage.submitLoginForm(user.email, user.password);

  cy.log('Verify user authorized');
  homePage.getProfileButton().should('be.visible');

})

it.only('Authorization via API', () => {
  
  loginViaAPI(user);

  cy.log('Authorize user');
  homePage.visit();

  cy.log('Verify user authorized');
  homePage.getProfileButton().should('be.visible');
})