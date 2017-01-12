import draw from './draw'
import animate from './animate'
import onAnimateFinish from './onAnimateFinish'
import {checkIntersect as circlesIntersect, has as circlesHas} from'./circlesCollection'
import {remove, checkIntersect as elementsIntersect, has as elementsHas} from'./elementsCollection'
import getRoute from './getRoute'
import getPlacemark from "./getPlacemark";
import {putOnMap, removeFromMap} from './myMap'
async function renderRoute(referencePoints, speed, targetPoint = getPlacemark({ coords: referencePoints[0] })) {
  const multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints,
    params: {
      routingMode: 'pedestrian'
    }
  });
  const routes = await new Promise((res, rej) => {
    multiRoute.model.events.add('requestsuccess', (e) => res(e.get("target").getRoutes()));
    multiRoute.model.events.add('requestfail', (e) => rej(e));
  });
  if (!routes.length) {
    console.log('routes not found');
    removeFromMap(remove(targetPoint));
    return false
  }
  if (!targetPoint.getMap())  putOnMap(targetPoint);
  await targetPoint.getOverlay();
  const { routeLength, coordinates } = getRoute(routes);
  const checkIntersect = (item) => () => {
    return circlesHas(item) && elementsIntersect(item) || elementsHas(item) && circlesIntersect(item)
  };
  let result;
  try {
    result = await animate({
                 speed,
      dist:      routeLength,
      intersect: checkIntersect(targetPoint),
      draw:      draw({
        target: targetPoint,
        route:  coordinates
      })
    });
  } catch (e) {
    console.log('animation error', e)
  }
  if (!result && elementsHas(targetPoint)) {
    return ('zombie at home');
  }
  return {
    next: onAnimateFinish(targetPoint)(result),
          targetPoint
  };
}
export default renderRoute