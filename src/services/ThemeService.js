import config from '../config';

function getOneTheme(token,themeId){
  const data = fetch(`${config.root}/themes/${themeId}`, {
    method : 'GET',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json',
      Authorization : "Bearer "+token
    }
  });
  return data;
}
function getAllThemes(token){
  const data = fetch(`${config.root}/themes`, {
    method : 'GET',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json',
      Authorization : "Bearer "+token
    }
  });
  return data;
}
function getRandomQuestion(token,themeId){
  const data = fetch(`${config.root}/themes/${themeId}/randomQuestion`, {
    method : 'GET',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json',
      Authorization : "Bearer "+token
    }
  });
  return data;
}

export default {getOneTheme,getAllThemes,getRandomQuestion};
