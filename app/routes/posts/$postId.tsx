import { Outlet } from "@remix-run/react";
import { db } from '~/utils/db.server';
import {
  redirect
} from "@remix-run/node";
import type {
  LoaderFunction,
  ActionFunction
} from "@remix-run/node";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData(); 
  console.log(params.postId)
  if(formData.get("_method")=== "delete"){
    await db.post.delete({ where:{id: params.postId } });
    return redirect(`/posts`)
  }
  else
  {
    const title: string = formData.get("title")?.toString() || '';
    const body: string = formData.get("body")?.toString() || '';
    const post: {title: string, body: string} = { title, body };
    const updated = await db.post.update({ where:{id: params.postId }, data: post });
    return redirect(`/posts/${updated.id}`)
  }
};

function Post() {
  return (
    <main>
      <Outlet/>
    </main>
  )
}
export default Post;