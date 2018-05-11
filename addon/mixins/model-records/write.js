import Ember from 'ember';
import EmberDataRouteMixin from 'ember-data-route';

const {
  get,
  getOwner,
  Mixin
} = Ember;

export default Mixin.create(EmberDataRouteMixin, {
  renderTemplate() {
    let templatePath = `${this.templateAdminPath}/${this.paramsFor('model-records').name}`;
    let defaultTemplatePath = `${this.templateAdminPath}/default`;

    if (getOwner(this).lookup(`template:${templatePath}`)) {
      this.render(templatePath);
    } else {
      this.render(defaultTemplatePath);
    }
  },
  actions: {
    save(callback) {
      let promise = get(this, 'controller.model').save();
      callback(promise);

      promise.then(() => {
        this.transitionTo('model-records', this.paramsFor('model-records').name);
      });
    },
    cancel() {
      this.transitionTo('model-records', this.paramsFor('model-records').name);
    }
  },
  willTransitionConfirm() {
    if (['model-records.index', 'model-records.show'].includes(get(this, 'router.currentRouteName'))) {
      return true;
    }
    return window.confirm('Você tem alterações não salvas. Tem certeza que deseja continuar?');
  }
});
