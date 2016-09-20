import Ember from 'ember';
import layout from '../templates/components/mapbox-popup';

export default Ember.Component.extend({
  layout,
  didInsertElement() {
    this._super(...arguments);

    let marker = this.get('marker');
    if (marker) {
      marker.bindPopup(this.element);
    }
  }
});
