import { RenderableTreeNodes, renderers } from "@markdoc/markdoc";
import React from "react";
import { Fence } from "~/helper/markdoc/nodes/Fence";
import { Callout } from "~/helper/markdoc/tags/Callout";
type Props = { content: RenderableTreeNodes };
//解析markdown
export function Markdown({ content }: Props) {
  return (
    <>
      {renderers.react(content, React, {
        components: {
          Fence,
          Callout,
        },
      })}
    </>
  );
}
