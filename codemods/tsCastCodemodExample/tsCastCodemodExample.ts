import core, { API, ASTPath, FileInfo } from 'jscodeshift';
import { NodePath } from "ast-types/lib/node-path"

/**
 * Details here don't matter too much for this example, but the meat of the issue is this function
 * can return more than one type.
 */
type attributeValueType = string | number | boolean | RegExp | null | undefined;

const getJSXAttributeValue = (
  j: core.JSCodeshift, 
  element: ASTPath, 
  name: string
): attributeValueType => {
  return "oldValue";
}

/**
 * Details here don't matter much either, just a quick object store to easily map a retrieved
 * attribute value to a new value.
 */
const valueMap = {
  oldValue: "newValue",
  foo: "bar",
  other: "values..."
}

const transformer = (file: FileInfo, api: API): string => {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.findJSXElements('TestComponent').forEach((element) => {
    /**
       * Casting the type of the retrieved value prevents the following Typescript error from
       * showing up on L:39:
       *
       *    Element implicitly has an 'any' type because expression of type 'string' can't be used
       *    to index type '{ oldValue: string; foo: string; other: string; }'.
       *
       * Remove the cast to expose the Typescript error.
       *
       * Unfortunately jscodeshift can't handle the type casting and throws it's own error:
       *
       *    JSCodeshift-type-casting-error/codemods/tsCastCodemodExample/tsCastCodemodExample.ts: Missing semicolon. (52:76)
       *    const retrievedValue = getJSXAttributeValue(j, element, 'testAttribute') as keyof typeof valueMap;
       *                                                                            ^
       * 
       * Oddly there are no issues when running jscodeshift through the provided 'defineInlineTest'
       * function.
       *
       */
    const retrievedValue = getJSXAttributeValue(j, element, 'testAttribute') as keyof typeof valueMap;
    const replacementValue = valueMap[retrievedValue];

    if (!!replacementValue) {
      console.log(`In this example our retrieved value of "${retrievedValue}" is mapped to the replacement value of "${replacementValue}"`);

      j(element)
      .find(j.JSXOpeningElement)
      .find(j.JSXAttribute, {
        name: {
          name: 'testAttribute',
        },
      }).forEach(attribute => {
        j(attribute).replaceWith(
          (nodePath: NodePath) => {
            const { node } = nodePath;
            node.value.value = replacementValue;

            return node;
          }
        )
      });
    }
  });

  return root.toSource();
};

export default transformer;
