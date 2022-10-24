import { baseURL, kbGuid, request, WizReturnType } from "~/utils/baseApi";

//获取文件夹列表
export async function getCategoryList() {
  let data = await request<unknown, WizReturnType<string[]>>(
    `/category/all/${kbGuid}`
  );
  return data;
}

//获取文件夹下的文章列表
interface ArticleListItem {
  abstractText: string;
  docGuid: string;
  title: string;
  category: string;
  created: number;
  tags: string; //以*做分割
  dataModified: number;
  type: "lite/markdown" | "collaboration"; //只使用markdown
}
export async function getArticleList(category: string, count = 10) {
  let data = await request<unknown, WizReturnType<ArticleListItem[]>>(
    `/note/list/category/${kbGuid}`,
    {
      params: {
        start: 0,
        count: count,
        category: `/${category}/`,
        withAbstract: true,
        orderBy: "created",
        ascending: "desc",
      },
    }
  );
  return data;
}

//获取文章详情
export async function getArticleDetail(
  docId = "31f118e4-7b84-4e1d-a82b-5cf629e600dd"
) {
  let data = await request<unknown, string>(
    `/note/view/bd5d4640-62c8-11eb-9685-273bbfc748ff/${docId}`
  );

  return handleArticleDetail(data, docId);
}
//处理文章内容
export function handleArticleDetail(data: string, docId: string) {
  let str = "";
  let matchPrev = /<pre>([\w\W]*)<\/pre>/;
  let resultArr = matchPrev.exec(data);
  if (resultArr) {
    let replaceImgUrl = /(!\[.*?\]\()(.+?)(\))/g;
    str = resultArr[1]
      .replace(replaceImgUrl, (whole, a, b, c) => {
        return a + `${baseURL}/share/resources/${kbGuid}/${docId}/` + b + c;
      })
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  return str;
}
