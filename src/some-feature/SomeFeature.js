import { Model, DataTypes } from 'sequelize';

/**
 * Represent a model to manage some-feature table
 */
class SomeFeature extends Model {
  static init(sequelize) {
    return super.init({
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    }, {
      sequelize,
      modelName: 'some-feature',
      tableName: 'some-feature'
    });
  }
}

export default SomeFeature;
