import { validate as uuidValidate } from 'uuid';
import { sendBadRequest, sendNotFound } from './handler-error';

/**@deprecated old*/
export function checkIdAndEntityOld<T>(id: string, dao: Map<string, T>): T {
  checkId(id);
  const entity: T = dao.get(id);
  if (!entity)
    sendNotFound('Id doesn\'t exist');
  return entity;
}

/** checks the id */
export function checkId(id: string) {
  if (!uuidValidate(id))
    sendBadRequest('Id is invalid (not uuid)');
}