import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const getConfigDirname = (importMetaUrl: string) =>
  path.dirname(fileURLToPath(importMetaUrl));
