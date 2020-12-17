import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('e2e tests', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  describe('routing tests', () => {
    it('should reach intro', () => {
      page.reachIntro();
      expect(page.getCurrentRoute()).toContain('intro');
    });

    it('should reach questions', () => {
      page.reachQuestions();
      expect(page.getCurrentRoute()).toContain('questions');
    });

    it('should reach infos', () => {
      page.reachInfos();
      expect(page.getCurrentRoute()).toContain('infos');
    });

    it('should reach faq', () => {
      page.reachFaq();
      expect(page.getCurrentRoute()).toContain('faq');
    });

    it('should reach tipps', () => {
      page.reachTips();
      expect(page.getCurrentRoute()).toContain('tipps');
    });

    it('should reach quiz', () => {
      page.reachQuiz();
      expect(page.getCurrentRoute()).toContain('quiz');
    });

    it('should reach nova', () => {
      page.reachNova();
      expect(page.getCurrentRoute()).toContain('nova');
    });
  });

  describe('Alleare app initial workflow', () => {
    beforeEach(() => {
      page.reachIntro();
      browser.waitForAngularEnabled(false);
    });

    it('should get intro submit button text', () => {
      const button = page.getButtonByText('WEITER');
      expect(button.getText()).toEqual('WEITER');
    });

    it('should  disable intro submit button when large text is input', () => {
      const button = page.getButtonByText('WEITER');
      expect(button.getText()).toEqual('WEITER');
    });
  });
});
