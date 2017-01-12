import { removeFromMap, getMap } from './myMap'
let elements;
export function checkIntersect(elem){
  return !!elements.searchIntersect(elem).getLength()
}
export function add(elem, zombie){
  elements = elements? elements.add(elem) : ymaps.geoQuery(elem);
  getMap().events.fire('elemCount', {count:elements.getLength()});
  return elem
}

export function has(item) {
  return !!(elements && ~elements.indexOf(item))
}

export function remove(elem){
  elements = elements.remove(elem);
  getMap().events.fire('elemCount', {count:elements.getLength()});
  return elem
}
export function onCollision(elem) {
  let strength = elem.properties.get('strength');
  elem.properties.set('strength', --strength);
  if (!strength) {
    removeFromMap(remove(elem));
  }
  return strength
}