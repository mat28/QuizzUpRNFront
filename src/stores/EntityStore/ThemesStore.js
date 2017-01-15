import { observable } from 'mobx';

class ThemesStore {
  @observable themes;

  setThemes(themes){
    this.themes = themes;
  }
}

export default new ThemesStore();
