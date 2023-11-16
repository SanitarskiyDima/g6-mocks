import homePage from "../support/pages/HomePage";
import user from "../fixtures/user.json"
import articles from "../fixtures/articles.json"
import { loginViaAPI } from "../support/helper";


let tagsArr = { "tags": ["$$$$$$$", "taggggtaggggtaggggtaggggtaggggtaggggtagggg", "123123123"] };

beforeEach(() => {
  loginViaAPI(user);
  cy.intercept('GET', '**/tags**', tagsArr);
  cy.intercept('GET', '**/articles**', articles);
})

it('Tags should display on home page', () => {
  homePage.visit();

  cy.log('Verify user authorized');
  homePage.getProfileButton().should('be.visible');

  cy.log('Verify mock tags displayed');
  homePage.getTagsList().should('contain', tagsArr.tags[0]);
  homePage.getTagsList().should('contain', tagsArr.tags[1]);
  homePage.getTagsList().should('contain', tagsArr.tags[2]);
})

it('Article should display on home page', () => {
  homePage.visit();

  cy.log('Verify user authorized');
  homePage.getProfileButton().should('be.visible');

  cy.log('Open global feed');
  cy.contains('Global Feed').click();

  cy.log('Verify mock tags displayed');
  cy.contains(articles.articles[0].title)
    .parent('.article-preview')
    .find('.btn.btn-sm.btn-primary')
    .should('contain', articles.articles[0].favoritesCount);
})