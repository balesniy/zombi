import {putOnMap, checkCenter} from './myMap'
import renderRoute from './renderRoute'
import {house} from './config'
import {add} from "./circlesCollection";
export default async function (e) {
  if (checkCenter(e.get('coords'))) return false;
  // Создаем круг.
  const myCircle = new ymaps.Circle([house, 50], { strength: 9 }, {
    // Задаем опции круга.
    // Включаем возможность перетаскивания круга.
    draggable:     false,
    // Цвет обводки.
    strokeColor:   "#009900",
    // Прозрачность обводки.
    strokeOpacity: 0.5,
    // Ширина обводки в пикселях.
    strokeWidth:   7,
    fillImageHref: 'images/plant.png'
  });
  // Добавляем круг на карту.
  putOnMap(myCircle);
  await myCircle.getOverlay()
  // Добавляем в коллекцию запроса
  add(myCircle);
  renderRoute([house, e.get('coords')], 1 / 10, myCircle)
}
