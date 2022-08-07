import { validate as uuidValidate } from 'uuid';
import { sendBadRequest } from './handler-error';

/** checks the id */
export function checkId(id: string) {
  if (!uuidValidate(id))
    sendBadRequest('Id is invalid (not uuid)');
}