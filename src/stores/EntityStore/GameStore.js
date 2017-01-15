import { observable } from 'mobx';

class GameStore {
  @observable training;
  @observable question;
  @observable numberQuestion = 1;
  @observable numberTrue = 0;
  @observable numberFalse = 0;
  @observable progress = 0;


  setGame(game){
    this.question = game;
  }
}

export default new GameStore();
