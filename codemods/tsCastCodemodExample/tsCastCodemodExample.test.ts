
import { defineInlineTest } from 'jscodeshift/src/testUtils';
import transformer from "./tsCastCodemodExample";
import {testIn, testOut} from "./tsCastCodemodExample.testFixture";

describe('tsCastCodemodTest', () => {
  defineInlineTest(
    transformer,
    {},
    testIn,
    testOut,
    'should convert the testAttribute value from "oldValue" to "newValue"',
  );
});
