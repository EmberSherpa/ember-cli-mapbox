import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      lat: '37.768',
      lng: '-122.381',
      name: 'city'
    }]
  }
});
