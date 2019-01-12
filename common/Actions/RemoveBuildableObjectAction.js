import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} buildableObjectHashId
 * @param {number|null} tickOccurred
 * @param {number|null} senderId
 * @constructor
 */
function RemoveBuildableObjectAction(buildableObjectHashId, tickOccurred = null, senderId = null) {
  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getBuildableObjectHashId = () => buildableObjectHashId;
  setDebugProperty(this, 'buildableObjectHashId', buildableObjectHashId);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.tickOccurred = tickOccurred;
  this.actionInterface.senderId = senderId;
}

RemoveBuildableObjectAction.serializableInterface =
  new SerializableInterface(RemoveBuildableObjectAction, {
    /**
     * @param {RemoveBuildableObjectAction} action
     */
    serialize: action => ({
      buildableObjectHashId: () => action.getBuildableObjectHashId(),
      tickOccurred: () => action.actionInterface.tickOccurred,
      senderId: () => action.actionInterface.senderId,
    }),

    deserialize: object => new RemoveBuildableObjectAction(
      object.buildableObjectHashId,
      object.tickOccurred,
      object.senderId,
    ),
  });

export default RemoveBuildableObjectAction;
