
import { defineInlineTest } from 'jscodeshift/src/testUtils';
import transformer from "./tsCastCodemodExample";

describe('tsCastCodemodTest', () => {
  defineInlineTest(
    transformer,
    {},
    '<TestComponent testAttribute="oldValue" />',
    '<TestComponent testAttribute="newValue" />',
    'should convert the testAttribute value from "oldValue" to "newValue"',
  );
});
