import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleMarker(marker) {
      let openMarker = this.get('openMarker');
      this.set('openMarker', openMarker === marker ? null : marker);
    },
    closeMarker(marker) {
      this.set('openMarker', null);
    }
  }
});
