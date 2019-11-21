import SomeFeature from '../../src/some-feature/SomeFeature';

const _initializeData = async () => {
  const feature = SomeFeature.create({
    name: 'featureName',
    uses: 'featureUses'
  });
  return feature;
};

const _destroyDatabase = async () => {
  await SomeFeature.destroy({ truncate: true, cascade: true });
};

const _doingSomething = async () => {
  console.log('');
};

describe('SomeFeatureController', () => {
  beforeEach(_destroyDatabase);

  describe('GET /feature...', () => {
    const feature = _initializeData();

    expect(feature).toEqual(feature);
  });

  afterEach(_doingSomething);
});
