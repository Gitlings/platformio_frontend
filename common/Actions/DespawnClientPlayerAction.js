import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * This action is performed when a player logs out.
 * For just despawning a player (on switching to builder mode, for example) DespawnPlayerAction
 * is used.
 *
 * @param {number} clientId
 * @param {number|null} tickOccurred
 * @param {number|null} senderId
 * @constructor
 */
function DespawnClientPlayerAction(clientId, tickOccurred = null, senderId = null) {
  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  /**
   * @return {number}
   */
  this.getClientId = () => clientId;
  setDebugProperty(this, 'clientId', clientId);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.tickOccurred = tickOccurred;
  this.actionInterface.senderId = senderId;
}

DespawnClientPlayerAction.serializableInterface =
  new SerializableInterface(DespawnClientPlayerAction, {
    /**
     * @param {DespawnClientPlayerAction} action
     */
    serialize: action => ({
      clientId: () => action.getClientId(),
      tickOccurred: () => action.actionInterface.tickOccurred,
      senderId: () => action.actionInterface.senderId,
    }),

    deserialize: object => new DespawnClientPlayerAction(
      object.clientId,
      object.tickOccurred,
      object.senderId,
    ),
  });

export default DespawnClientPlayerAction;
