/* eslint import/no-default-export: 0 */
import { createDomainPackageConfig } from '../../configs/tsup/domain.js';

export default createDomainPackageConfig({
  entry: ['./src/index.ts'],
  copyGlobs: ['src/infrastructure/{styles,fonts}/**/*', 'src/main.css'],
});
