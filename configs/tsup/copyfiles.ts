import { execSync } from 'node:child_process';

export const createCopyfilesSuccess = (globs: string[]) => async () => {
  const stdio = 'inherit';
  for (const glob of globs) {
    execSync(`copyfiles -u 1 "${glob}" dist`, { stdio });
  }
};
