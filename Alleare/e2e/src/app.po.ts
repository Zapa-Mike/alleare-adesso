import { browser, by, protractor, element, until } from 'protractor';

export class AppPage {
  constructor() {
    browser.waitForAngularEnabled(false);
  }
  public navigateTo() {
    return browser.get('/');
  }
  public getCurrentRoute() {
    return browser.getCurrentUrl();
  }
  public reachIntro() {
    return browser.get('/intro');
  }
  public reachQuestions() {
    return browser.get('/questions');
  }
  public reachInfos() {
    return browser.get('/infos');
  }
  public reachFaq() {
    return browser.get('/faq');
  }
  public reachQuiz() {
    return browser.get('/quiz');
  }
  public reachNova() {
    return browser.get('/nova');
  }
  public reachTips() {
    return browser.get('/tipps');
  }
  public getButtonByText(text: string) {
    const until = protractor.ExpectedConditions;
    browser.wait(
      until.presenceOf(element(by.cssContainingText('button', text)))
    );
    return element(by.cssContainingText('button', text));
  }
}
