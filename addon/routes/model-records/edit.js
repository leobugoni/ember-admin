import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

const {
  get,
  Route,
  RSVP: { Promise }
} = Ember;

export default Route.extend(WriteMixin, {
  model(params) {
    return this.admin.store.find(this.paramsFor('model-records').name, params.id);
  },
  templateAdminPath: 'admin/edit',
  actions: {
    destroyRecord(callback) {
      let canDestroy = window.confirm('Tem certeza que deseja destruir esse registro?');
      let promise;

      if (canDestroy) {
        promise = get(this, 'controller.model').destroyRecord();
        callback(promise);

        promise.then(() => {
          this.transitionTo('model-records', this.paramsFor('model-records').name);
        });
      } else {
        promise = new Promise(function(resolve, reject) {
          reject();
        });
        callback(promise);
      }
    }
  }
});
