import {add as addToElements} from './elementsCollection'
export default function getPlacemark({ coords, size, offset, img }) {
  const options = img ? {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout:      'default#image',
    // Своё изображение иконки метки.
    iconImageHref:   `images/${img}.png`,
    // Размеры метки.
    iconImageSize:   size,
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: offset,
  } : {
    // Необходимо указать данный тип макета.
    iconLayout:      'default#image',
    // Своё изображение иконки метки.
    iconImageHref:   'images/zombie.png',
    // Размеры метки.
    iconImageSize:   [30, 50],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-15, -50],
    balloonLayout: ymaps.templateLayoutFactory.createClass('<div class="my-hint">{{properties.strength}}</div>'),
    hideIconOnBalloonOpen: false,
  };
  const placemark = new ymaps.Placemark(coords, { visits: new Map(), strength: 9 }, options);
  return addToElements(placemark, !!img)
}