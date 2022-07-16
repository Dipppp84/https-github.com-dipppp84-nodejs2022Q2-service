import { validate as uuidValidate } from 'uuid';
import { sendBadRequest, sendNotFound } from './handler-error';

/** checks the id and presence of the entity and returns it */
export function checkIdAndEntity<T>(id: string, dao: Map<string, T>): T {
  if (!uuidValidate(id))
    sendBadRequest('Id is invalid (not uuid)');
  const entity: T = dao.get(id);
  if (!entity)
    sendNotFound('Id doesn\'t exist');
  return entity;
}