import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * This action is performed when a player logs out.
 * For just despawning a player (on switching to builder mode, for example) DespawnPlayerAction
 * is used.
 *
 * @param {number} clientId
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function DespawnClientPlayerAction(clientId, timeOccurred = 0, senderId = null) {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => parameters.timeOccurred,

    setTimeOccurred: (newTimeOccurred) => {
      parameters.timeOccurred = newTimeOccurred;
      setDebugProperty(this, 'timeOccurred', newTimeOccurred);
      return this;
    },
  });

  this.broadcastedActionInterface = new BroadcastedActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  /**
   * @return {number}
   */
  this.getClientId = () => clientId;
  setDebugProperty(this, 'clientId', clientId);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

DespawnClientPlayerAction.serializableInterface =
  new SerializableInterface(DespawnClientPlayerAction, {
    /**
     * @param {DespawnClientPlayerAction} action
     */
    serialize: action => ({
      clientId: () => action.getClientId(),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: object => new DespawnClientPlayerAction(
      object.clientId,
      new Date(object.timeOccurred),
      object.senderId,
    ),
  });

export default DespawnClientPlayerAction;
