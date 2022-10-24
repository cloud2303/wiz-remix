import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getArticleDetail, getCategoryList } from "~/api/getWizData";

export async function loader() {
  let data = await getCategoryList();
  console.log(data)
  return data.result
}
export default function Index() {
  let data = useLoaderData<typeof loader>()
  console.log(data)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {data.map((item) => (<div key={item}><Link to={`${item}`}>{item}</Link></div>))}
    </div >
  );
}
