import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';

/**
 * ActionInterface must be implemented for instances (inside a constructor).
 * Optional methods:
 * - isBroadcastedAfterExecution
 *
 * ActionInterface has to be implemented for all the actions that have to be broadcasted
 * over a network. The implementation itself can be empty or have `isBroadcastedAfterExecution`,
 * which can be used for indicating that action can't be processed at once.
 *
 * @param action
 * @param interfaceImplementation
 * @constructor
 */
function ActionInterface(action, interfaceImplementation) {
  const implementation = new InterfaceImplementation(this, action, interfaceImplementation);

  this.senderId = null;

  this.tickOccurred = null;

  this.id = 0;

  /**
   * If this function returns true, the action will be executed during a game tick, otherwise it'll
   * be executed once received.
   *
   * @return {boolean}
   */
  this.isBroadcastedAfterExecution = () => (
    implementation.callMethodOr(false, 'isBroadcastedAfterExecution')
  );

  /**
   * If both this function and isBroadcastedAfterExecution return true, the action will not be added
   * to BroadcastedActionsQueue automatically, thus it's important to do it manually in systems.
   *
   * @return {boolean}
   */
  this.isAlteredDuringExecution = () => (
    implementation.callMethodOr(false, 'isAlteredDuringExecution')
  );
}

ActionInterface.assert = (entity) => {
  assertInterface(entity.actionInterface, ActionInterface);
};

ActionInterface.has = entity => isInterface(entity.actionInterface, ActionInterface);

export default ActionInterface;
