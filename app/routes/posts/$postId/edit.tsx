import { useLoaderData, Link } from "@remix-run/react";
import { db } from '~/utils/db.server';
import {
  redirect
} from "@remix-run/node";
import type {
  LoaderFunction,
  ActionFunction
} from "@remix-run/node";


export const loader: LoaderFunction = async ({params}) => {
  const post = await db.post.findUnique({
      where: {id: params.postId},
    })
  if(!post){
    throw new Error('No post found');
  }
  const data = {post};
  return data;
}

export const action: ActionFunction = async ({ request, params }) => {

  const formData = await request.formData();
  const title: string = formData.get("title")?.toString() || '';
  const body: string = formData.get("body")?.toString() || '';
  const post: {title: string, body: string} = { title, body };

  const updated = await db.post.update({ where:{id: params.postId }, data: post });
  return redirect(`/posts/${updated.id}`)
};

  function Post() {
    // const params = useParams()
    const {post} = useLoaderData()
    return(
      <>
      <div className="page-header">
        <h1>Update Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method='post'>
        <input type="hidden" name="_method" value="update"/>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Title" id="title" defaultValue={post.title}/>
          </div>
          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea  name="body" id="body" defaultValue={post.body} />
          </div>
          <button type="submit" className="btn btn-block">Update Post</button>
        </form>
      </div>
    </>
    )
  }
  export default Post;