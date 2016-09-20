import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('mapid', {
    path: '/'
  });
  this.route('stylelayer');
  this.route('marker');
});

export default Router;
