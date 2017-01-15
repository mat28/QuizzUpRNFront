import { observable } from 'mobx';

class OptionStore {
  @observable user;
  @observable selectedEye = 'eyes1';
  @observable selectedNose = 'nose2';
  @observable selectedMouth = 'mouth1';
  @observable selectedColor = '0A69FE';
  @observable urlImage = "https://api.adorable.io/avatars/face/";

  setUser(user) {
    this.user = user;
  }
  getUrlImage(){
    return this.urlImage+this.selectedEye+"/"+this.selectedNose+"/"+this.selectedMouth+"/"+this.selectedColor;
  }
}

export default new OptionStore()
