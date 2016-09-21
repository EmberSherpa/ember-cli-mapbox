import Ember from 'ember';
import layout from '../templates/components/mapbox-popup';

const {
  run: {
    bind
  }
} = Ember;

export default Ember.Component.extend({
  layout,
  didInsertElement() {
    this._super(...arguments);

    let marker = this.get('marker');
    if (marker) {
      marker.bindPopup(this.element);

      marker.openPopup();

      marker.on('popupclose', this._closeMarker = bind(this, this.close));
    }
  },

  close() {
    this.sendAction('onclose');
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('marker').closePopup();
    this.get('marker').unbindPopup(this.element);
    this.get('marker').off('popupclose', this._closeMarker);
  }
});
