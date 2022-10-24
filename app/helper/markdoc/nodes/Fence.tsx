import { nodes } from '@markdoc/markdoc';
import Prism from 'prismjs';
Prism.languages.markdoc = {
  tag: {
      pattern: /{%(.|\n)*?%}/i,
      inside: {
          tagType: {
              pattern: /^({%\s*\/?)(\w*|-)*\b/i,
              lookbehind: true
          },
          id: /#(\w|-)*\b/,
          string: /".*?"/,
          equals: /=/,
          number: /\b\d+\b/i,
          variable: {
              pattern: /\$[\w.]+/i,
              inside: {
                  punctuation: /\./i
              }
          },
          function: /\b\w+(?=\()/,
          punctuation: /({%|\/?%})/i,
          boolean: /false|true/
      }
  },
  variable: {
      pattern: /\$\w+/i
  },
  function: {
      pattern: /\b\w+(?=\()/i
  }
};
export interface FenceNodeI  {
  children:string,
  'data-language':string
}
export function Fence({ children, 'data-language': language }:FenceNodeI) {

  const lang = language === 'md' ? 'markdoc' : language || 'markdoc';
  return (
      <div className="relative" aria-live="polite">
      <pre
        key={children}
        className={`language-${lang}`}
        dangerouslySetInnerHTML={{__html:Prism.highlight(children,Prism.languages.markdoc,lang)}}
      >
      </pre>
      </div>
  );
}
export const fence = {
  render: "Fence",
  attributes: nodes.fence.attributes,
};