import SomeFeature from '../../src/some-feature/SomeFeature';

const _initializeData = async () => SomeFeature.create({
  name: 'featureName',
  uses: 'featureUses'
});

const _destroyDatabase = async () => {
  await SomeFeature.destroy({ truncate: true, cascade: true });
};

const _doingSomething = async () => {
  console.log('');
};

describe.skip('SomeFeatureController', () => {
  beforeEach(_destroyDatabase);

  afterEach(_doingSomething);

  describe('GET /feature...', () => {
    const feature = _initializeData();

    expect(feature).toEqual(feature);
  });
});
