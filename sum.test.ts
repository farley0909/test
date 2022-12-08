
import {describe, expect, test} from '@jest/globals';
import { sum } from "./sum";

test("expected 8",()=>{
    expect(sum(4,4)).toBe(8);
})
