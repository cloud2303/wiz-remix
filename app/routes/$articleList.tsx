import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getArticleList } from "~/api/getWizData";

export async function loader({ params }: LoaderArgs) {
  console.log(params.articleList)
  let directory = params.articleList || ""
  let articleList = await getArticleList(directory)
  console.log(articleList)
  return articleList.result.filter(item => item.type === "lite/markdown")
}
function List() {
  let data = useLoaderData<typeof loader>()
  console.log(data)
  return <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
    {data.map((item) => (<div key={item.docGuid}><Link to={`/post/${item.docGuid}`}>{item.title}</Link></div>))}
  </div >
}
export default List;