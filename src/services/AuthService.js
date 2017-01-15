import config from '../config';

function login(email,password){
  const data = fetch(`${config.root}/auth/login`,{
    method : 'POST',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      email,
      password
    })
  });
  return data;
}

function getUser(token,userId){
  const data = fetch(`${config.root}/users/${userId}`, {
    method : 'GET',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json',
      Authorization : "Bearer "+token
    }
  });
  return data;
}

function logout(token){
  const data = fetch(`${config.root}/auth/logout`,{
    method : 'GET',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json',
      Authorization : "Bearer "+token
    }
  });
  return data;
}

export default {login, getUser, logout};
