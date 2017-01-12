let myMap, houseCircle;
export function putOnMap(elem) {
  return myMap.geoObjects.add(elem)
}
export function removeFromMap(elem) {
  return myMap.geoObjects.remove(elem)
}
export function initMap(center, zoom) {
  myMap = new ymaps.Map("map", {
              center,
              zoom,
    controls: ["zoomControl", "fullscreenControl"]
  });
  //--------------
  // Создаем собственный класс.
  const CustomControlClass = function (options) {
    CustomControlClass.superclass.constructor.call(this, options);
    this._$content = null;
    this._geocoderDeferred = null;
  };
  // И наследуем его от collection.Item.
  ymaps.util.augment(CustomControlClass, ymaps.collection.Item, {
    onAddToMap:         function (map) {
      CustomControlClass.superclass.onAddToMap.call(this, map);
      this.getParent().getChildElement(this).then(this._onGetChildElement, this);
    },
    onRemoveFromMap:    function (oldMap) {
      if (this._$content) {
        this._$content.remove();
      }
      CustomControlClass.superclass.onRemoveFromMap.call(this, oldMap);
    },
    _onGetChildElement: function (parentDomContainer) {
      // Создаем HTML-элемент с текстом.
      const div = document.createElement('div');
      div.classList.add('customControl');
      this._$content = parentDomContainer.appendChild(div);
      myMap.events.add('elemCount', this._createRequest, this);
      //this._createRequest({count:0});
    },
    _createRequest:     function (e) {
      this._$content.textContent = e.get('count')
    },
  });
  myMap.controls.add(new CustomControlClass(), {
    float: 'left',
  });
  //------------
  putOnMap(new ymaps.Placemark(center, {}, {
    iconLayout:      'default#image',
    iconImageHref:   `images/dom.png`,
    iconImageSize:   [100, 85],
    iconImageOffset: [-50, -50],
  }));
  houseCircle = new ymaps.Circle([center, 100], {}, {
    fillOpacity:   0.3,
    strokeColor:   "#009900",
    strokeOpacity: 0.5,
  });
  putOnMap(houseCircle);
  return myMap
}
export function checkCenter(coords) {
  return houseCircle.geometry.contains(coords)
}
export function getMap() {
  return myMap
}
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    getMap().destroy()
  });
}