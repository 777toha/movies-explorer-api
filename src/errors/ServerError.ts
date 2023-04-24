import BadRequestError from './BadRequestError';
import ConflictError from './ConflictError';
import ForbiddenError from './ForbiddenError';
import NotFoundError from './NotFoundError';
import UnauthorizedError from './UnauthorizedError';

type ServerError = BadRequestError |
ConflictError |
ForbiddenError |
NotFoundError |
UnauthorizedError;

export default ServerError;
