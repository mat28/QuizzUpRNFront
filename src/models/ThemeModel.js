class ThemeModel {
  constructor(themeData){
    this.name = themeData.theme.name;
    this.id = themeData.theme._id;
    this.image = themeData.theme.image;
  }
}

export default ThemeModel;
