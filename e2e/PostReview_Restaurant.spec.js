Feature('Post Review Restaurant');

Scenario('post a review', ({ I }) => {
  I.amOnPage('/');
  
  I.click(locate('.retaurant-item-link').first());
  
  const rand = (Math.random() + 1).toString(36).substring(7);
  const name = `Dicoding_${rand}`;
  const text = 'hello world!';
  
  I.waitForElement('#review-submit-button', 5);
  
  I.fillField('#review-input-name', name);
  I.fillField('#review-input-text', text);
  I.usePuppeteerTo('get submit button focus', async ({ page }) => {
    await page.focus('#review-submit-button');
    await page.keyboard.type('\n');;
  });

  I.waitForText(name, 5);
  
  I.see(name);
  I.see(text);
});
