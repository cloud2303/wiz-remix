import { parse, RenderableTreeNodes, transform } from "@markdoc/markdoc";
import { callout } from "./tags/Callout";
import {fence} from "./nodes/Fence";
export function parseContent(rawMarkdown: string):RenderableTreeNodes {
  return transform(parse(rawMarkdown),{
    tags:{
      callout
    },
    nodes:{
     fence 
    }
  }) 
}