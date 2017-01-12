import { getMap } from './myMap'
import {house} from './config'
import {add as addToElements} from './elementsCollection'
export default async function(n) {
  const { geoObjects } = await ymaps.geocode(house, {
    // Ищем только станции метро.
    kind:         'metro',
    // Запрашиваем не более n результатов.
    results:      n,
    strictBounds: true,
    boundedBy:    getMap().getBounds()
  });
  geoObjects.options.set({
    iconLayout:      'default#image',
    iconImageHref:   'images/mogila.png',
    iconImageSize:   [150, 150],
    iconImageOffset: [-75, -105]
  });
  addToElements(geoObjects);
  return geoObjects
}
