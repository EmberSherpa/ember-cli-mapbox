import Ember from 'ember';
import layout from '../templates/components/mapbox-map';
import {
  MAP_EVENTS
} from '../constants/events';

export default Ember.Component.extend({
  layout: layout,
  divId: 'map',

  mapId: null,

  setup: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      let mapId = this.get('mapId');
      let divId = this.get('divId');

      let map = L.mapbox.map(divId, mapId);

      // Bind Events
      MAP_EVENTS.forEach((event) => {
        map.on(event, (e) => this.sendAction('on' + event, map, e));
      });

      // Setters
      if (this.get('center')) {
        map.setView(this.get('center'), this.get('zoom'));
        this.set('lastCenter', this.get('center'));
      }

      let styleLayer = this.get('styleLayer');
      if (styleLayer) {
        L.mapbox.styleLayer(styleLayer).addTo(map);
      }

      if (this.get('click')) {
        Ember.deprecate('The "click" action in mapbox-map is deprecated, please use "onclick" instead.', false, {
          id: 'mapbox-map-click-action',
          url: 'https://github.com/binhums/ember-cli-mapbox',
          until: '1 April 2016'
        });

        map.on('click', (e) => this.sendAction('click', map, e));
      }

      // Set
      this.set('map', map);
    });
  }),

  didUpdateAttrs() {
    this._super(...arguments);

    let center = this.get('center');
    let lastCenter = this.get('lastCenter');
    if (center !== lastCenter) {
      this.get('map').setView(center, this.get('zoom'));
      this.set('lastCenter', center);
    }
  }
});
