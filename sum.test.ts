
import {describe, expect, test} from '@jest/globals';
import { sum } from "./sum";

test("expected 8",()=>{
    expect(sum(6,2)).toBe(8);
})
