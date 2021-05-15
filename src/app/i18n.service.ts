import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommunicationService } from './communication.service';
import { Language } from './core/models/language';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  languages: Language[] = [
    {
      isoCode: 'en',
      name: 'English',
    },
    {
      isoCode: 'ja',
      name: 'Japanese',
    },
  ];
  defaultLanguage: string = 'en';
  browserLang: string;
  LANGUAGE: string = 'language';

  constructor(
    public translate: TranslateService,
    public communicationService: CommunicationService
  ) {
    const languageCodes = this.languages.map((lang) => lang.isoCode);
    translate.addLangs(languageCodes);
    translate.setDefaultLang(this.defaultLanguage);
    this.browserLang =
      sessionStorage.getItem(this.LANGUAGE) || this.defaultLanguage;
    translate.use(
      this.browserLang != null && this.browserLang.match(/ja|en/)
        ? this.browserLang
        : this.defaultLanguage
    );
  }

  updateSessionLanguage(value: string) {
    this.translate.use(value);
    sessionStorage.setItem(this.LANGUAGE, value);
    this.communicationService.sendUpdateLangEvent(value);
  }

  getCurrentLang(): string {
    return this.browserLang;
  }

  getAllLanguages(): Language[] {
    return this.languages;
  }
}
