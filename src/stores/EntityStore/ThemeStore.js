import { observable } from 'mobx';

class ThemeStore {
  @observable theme;
  @observable themeId;

  setTheme(theme){
    this.theme = theme;
  }
  setThemeId(themeId){
    this.themeId = themeId;
  }
}

export default new ThemeStore();
