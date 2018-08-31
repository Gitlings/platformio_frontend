import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';
import SerializableRegistry from '../Registries/SerializableRegistry';
import PsonDictionary from '../Utils/PsonDictionary';

/**
 * @param constructor
 * @param interfaceImplementation
 * @constructor
 */
function SerializableInterface(constructor, interfaceImplementation) {
  if (!SerializableRegistry.hasConstructor(constructor.name)) {
    SerializableRegistry.registerConstructor(constructor);
  }

  const implementation = new InterfaceImplementation(this, constructor, interfaceImplementation);

  this.serialize = (object) => {
    const schema = implementation.callMethod('serialize', object);
    const plainObject = {};
    for (const field of Object.keys(schema)) {
      plainObject[field] = schema[field]();
    }
    plainObject.constructorName = constructor.name;
    return plainObject;
  };

  this.deserialize = json => implementation.callMethod('deserialize', json);

  const schema = implementation.callMethod('serialize');
  for (const field of Object.keys(schema)) {
    PsonDictionary.addWord(field);
  }
  PsonDictionary.addWord(constructor.name);
}

SerializableInterface.assert = (entity) => {
  assertInterface(entity.serializableInterface, SerializableInterface);
};

SerializableInterface.has = entity => (
  isInterface(entity.serializableInterface, SerializableInterface)
);

export default SerializableInterface;
