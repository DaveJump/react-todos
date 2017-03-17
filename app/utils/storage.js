function getItem(name){
  return JSON.parse(window.localStorage.getItem(name));
}
function setItem(name, value){
  if(typeof value !== 'string'){
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(name, value);
}

export { getItem, setItem }
