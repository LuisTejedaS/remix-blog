import { Outlet } from "@remix-run/react";
import { db } from '~/utils/db.server';
import {
  redirect
} from "@remix-run/node";
import type {
  ActionFunction
} from "@remix-run/node";


export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData(); 
  console.log(params.postId)
  if(formData.get("_method")=== "delete"){
    await db.post.delete({ where:{id: params.postId } }); 
  }
  return redirect(`/posts`)
};

function Post() {
  return (
    <main>
      <Outlet/>
    </main>
  )
}
export default Post;