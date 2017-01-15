class UserModel {
  constructor(userData){
    this.token = userData.jwtAccessToken;
    this.email = userData.user.email;
    this.userId = userData.user._id;
    this.firstName = userData.user.firstName;
    this.lastName = userData.user.lastName;
    this.image = userData.user.image;
  }
}

export default UserModel;
