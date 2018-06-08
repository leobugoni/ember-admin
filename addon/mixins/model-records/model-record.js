import Ember from 'ember';

const {
  computed,
  get,
  getOwner,
  Mixin
} = Ember;

export default Mixin.create({
  'model-record': computed('recordType', function() {
    let adapter = getOwner(this).lookup('data-adapter:main');
    let modelName = get(this, 'recordType').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    console.debug(`Transformed ${get(this, 'recordType')} to ${modelName}`);
    let type = adapter.getModelTypes().findBy('name', modelName);
    return adapter.wrapModelType(type.klass, get(this, 'recordType'));
  })
});
