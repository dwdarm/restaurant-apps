const assert = require('assert');

Feature('Favoriting Restaurant');

Before(({ I }) => {
  I.amOnPage('/favorite');
});

Scenario('showing empty favorited movies', ({ I }) => {
  I.see('You dont have favorited restaurant!');
});

Scenario('favoriting a restaurant', async ({ I }) => {
  I.see('You dont have favorited restaurant!');
  
  I.amOnPage('/');
  
  I.seeElement('restaurant-item');
  
  const restaurant = locate('.retaurant-item-link').first();
  const restaurantName = await I.grabTextFrom(restaurant);
  I.click(restaurant);
  
  I.waitForElement('.favorite-restaurant-button', 5);
  I.seeElement('.favorite-restaurant-button');
  I.click('.favorite-restaurant-button');
  
  I.amOnPage('/favorite');
  
  I.seeElement('restaurant-item');
  const favName = await I.grabTextFrom('.retaurant-item-link');
  
  assert.strictEqual(restaurantName, favName);
});

Scenario('unfavoriting a restaurant', async ({ I }) => {
  I.amOnPage('/');
  
  I.click(locate('.retaurant-item-link').first());
  
  I.waitForElement('.favorite-restaurant-button', 5);
  I.click('.favorite-restaurant-button');
  
  I.amOnPage('/favorite');
  
  I.seeElement('restaurant-item');
  I.click(locate('.retaurant-item-link').first());
  
  I.waitForElement('.favorite-restaurant-button', 5);
  I.click('.favorite-restaurant-button');
  
  I.amOnPage('/favorite');
  
  I.see('You dont have favorited restaurant!');
});
