import { Response } from 'express';
import { ErrorResponse } from './error-response';

export default class BaseController {
 public sendSuccessResponse(res: Response, data: any = {}): Response {
  return res.status(200).json(data);
 }

 public sendForbidden(res: Response, error: ErrorResponse): Response {
  return res.status(403).send(error);
 }

 public sendNotFound(res: Response, error: ErrorResponse): Response {
  return res.status(404).send(error);
 }
}
