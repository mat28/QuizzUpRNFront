import {observable} from 'mobx';

class AppViewStore {
  @observable routeStack2 = [
    {
      key : 'login',
    }
  ];
  routeStack = [
    {
      key : 'login'
    }
  ];

  @observable drawerOpened = false;
  @observable appLoading = false;

  pushRoute(routeObj) {
    this.routeStack.push(routeObj);
    this.routeStack2 = this.routeStack;
  }

  popRoute(){
    this.routeStack.pop();
    this.routeStack2 = this.routeStack;
  }

  replaceRoute(routeObj){
    this.routeStack.pop();
    this.routeStack.push(routeObj);
    this.routeStack2 = this.routeStack;
  }

  resetRoute(routeObj){
    this.routeStack.length = 0;
    this.routeStack.push(routeObj);
    this.routeStack2 = this.routeStack;
  }
}

export default new AppViewStore()
