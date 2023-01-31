import { SetMetadata } from '@nestjs/common';

import { Role } from '../models/roles.models';

// Metadata declaration
export const ROLES_KEY = 'roles';

// Metadata injection
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
