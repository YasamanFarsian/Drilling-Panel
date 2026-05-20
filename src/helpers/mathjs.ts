import { all, create, MathJsStatic } from 'mathjs';

export const math = create(all) as MathJsStatic;

math.config({ number: 'BigNumber' });
