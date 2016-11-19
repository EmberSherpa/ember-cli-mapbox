import Ember from 'ember';
import layout from '../templates/components/mapbox-marker';
import { MARKER_EVENTS } from '../constants/events';

export default Ember.Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  className: '',
  html: '',
  width: '',
  height: '',
  marker: null,
  draggable: false,

  isLoaded: Ember.computed('map', 'marker', function() {
    let map = this.get('map');
    let marker = this.get('marker');
    let cluster = this.get('cluster');

    if (!Ember.isEmpty(map) && !Ember.isEmpty(marker)) {
      if (!Ember.isEmpty(cluster)) {
        cluster.addLayer(marker);
      } else {
        marker.addTo(map);
      }
      return true;
    } else {
      return false;
    }
  }),

  iconChange: Ember.observer('className', 'html', 'width', 'height', function() {
    let map = this.get('map');
    let marker = this.get('marker');
    if (typeof map !== 'undefined' && marker != null) {
      marker.setIcon(L.divIcon({
          // specify a class name that we can refer to in styles
          className: this.get('className'),
          // html here defines what goes in the div created for each marker
          html: this.get('html'),
          // and the marker width and height
          iconSize: [this.get('width'), this.get('height')]
        }));
    }
  }),

  setup: Ember.on('init', function() {
    let marker = L.marker(this.get('coordinates'), {
      icon: L.divIcon({
          // specify a class name that we can refer to in styles
          className: this.get('className'),
          // html here defines what goes in the div created for each marker
          html: this.get('html'),
          // and the marker width and height
          iconSize: [this.get('width'), this.get('height')]
        }),
      draggable: this.get('draggable')
    });
    marker.bindPopup(this.get('popup-title'));

    MARKER_EVENTS.forEach((event) => {
      marker.on(event, (e) => this.sendAction('on' + event, marker, e));
    });

    this.set('marker', marker);
  }),

  teardown: Ember.on('willDestroyElement', function() {
    let marker = this.get('marker');
    let map = this.get('map');
    if (map && marker) {
      map.removeLayer(marker);
    }
  }),

  popup: Ember.on('didRender', function() {
    if (this.get('is-open')) {
      this.get('marker').openPopup();
      if (this.get('recenter')) {
        this.get('map').setView(this.get('coordinates'));
      }
    }
  })
});
