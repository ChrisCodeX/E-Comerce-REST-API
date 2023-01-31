import { SetMetadata } from '@nestjs/common';

// Metadata declaration
export const IS_PUBLIC_KEY = 'isPublic';

// Metadata injection
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
