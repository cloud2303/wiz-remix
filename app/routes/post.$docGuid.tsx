import { json, LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { getArticleDetail } from "~/api/getWizData"
import { Markdown } from "~/components/markdown";
import { parseContent } from "~/helper/markdoc/parseContent.server";
import codeStyle from '~/styles/code.css'
export function links() {
  return [
    { rel: "stylesheet", href: codeStyle },
  ];
}
// export const handle = { hydrate: true };
export async function loader({ params }: LoaderArgs) {
  let docGuid = params.docGuid || ""
  let data = await getArticleDetail(docGuid);
  console.log(data)
  return json({content:parseContent(data)})
}
function Article() {
  let {content} = useLoaderData<typeof loader>()

  return <><Markdown content={content}/></>
}
export default Article