class GameModel {
  constructor(gameData){
    this.name = gameData.question.name;
    this.responses = gameData.question.responses;
  }
}

export default GameModel;
