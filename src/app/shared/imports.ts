import {Sample} from './directives/sample';
import {SamplePipe} from './pipes/sample.pipe';

/**
 * An array of shared standalone components, directives, and pipes
 * that can be imported into other standalone components.
 */
export const SHARED_IMPORTS = [Sample, SamplePipe] as const;