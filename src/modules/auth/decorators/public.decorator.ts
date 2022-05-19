import { SetMetadata } from '@nestjs/common';

/** Metadata Key for the public decorator */
export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Sets Metadata isPublic to true
 * Is used during authorization process to prevent the
 * global auth guard from blocking everything
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
