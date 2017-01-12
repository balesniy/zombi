import getIterator from './getIterator'
import createCircle from './createCircle'
import {initMap, putOnMap, getMap} from './myMap'
import getNests from './getNests'
import {house} from './config'
import renderRoute from './renderRoute'

// todo redux, reload game, game over status, timer create circles

async function init() {
  console.log('init');
  const myMap = initMap(house, 15);
  myMap.events.add('click', createCircle);
  // Поиск станций метро.
  const geoObjects = await getNests(7);
  putOnMap(geoObjects);

  function startWave() {
    return [...getIterator(geoObjects)].map(({ geometry })=>
      renderRoute([geometry.getCoordinates(), house], 1 / 20)
    )
  }

  async function getPathResult(route) {
    return {
              route,
      result: await route
    }
  }

  let routes = startWave();
  const timer = setInterval(()=>routes.push(...startWave()), 10000);

  let result, route;
  while (result !== 'zombie at home') {
    ({
      route,
      result
    } = await Promise.race(routes.map(getPathResult)));
    routes.splice(routes.indexOf(route), 1);
    if (result.next) routes.push(renderRoute([...result.next, house], 1 / 20, result.targetPoint));
  }

  console.log('zombie at home');
  myMap.events.remove('click', createCircle);
  clearInterval(timer);
}
console.log('loading');
ymaps.ready(init);
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    getMap().destroy()
  });
}
