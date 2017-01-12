import { removeFromMap } from './myMap'
let circles;
export function getClosest(target) {
  const closest = circles.searchIntersect(target).getClosestTo(target);
  return {
            closest,
    center: closest.geometry.getCoordinates(),
    radius: closest.geometry.getRadius(),
  }
}

export function has(item) {
  return !!(circles && ~circles.indexOf(item))
}
export function getCircleStep (targetPoint, closest) {
  const visits = targetPoint.properties.get('visits');
  return visits.set(closest, (visits.get(closest) || 0) + 1).get(closest) * 20;
}

export function checkIntersect(elem){
  return !!(circles && circles.searchIntersect(elem).getLength())
}
export function add(elem){
  circles = circles ? circles.add(elem) : ymaps.geoQuery(elem);
  return elem
}
export function remove(elem){
  circles = circles.remove(elem);
  return elem
}
export function onCollision(elem) {
  let strength = elem.properties.get('strength');
  elem.properties.set('strength', --strength);
  if (strength && strength < 5 && strength >=3) elem.options.set('strokeColor', "#990066");
  if (strength && strength < 3) elem.options.set('strokeOpacity', 1);
  if (!strength) {
    removeFromMap(remove(elem));
  }
  return strength
}
