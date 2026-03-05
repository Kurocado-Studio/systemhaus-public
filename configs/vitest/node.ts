import { vitestNestjs } from '@kurocado-studio/qa/node';
import { defineConfig } from 'vitest/config';

export const createVitestNodeConfig = () => defineConfig(vitestNestjs);
