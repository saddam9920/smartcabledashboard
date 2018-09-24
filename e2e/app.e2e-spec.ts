import { SmartcabledashboardPage } from './app.po';

describe('smartcabledashboard App', () => {
  let page: SmartcabledashboardPage;

  beforeEach(() => {
    page = new SmartcabledashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
