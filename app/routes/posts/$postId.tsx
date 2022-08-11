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
  if(formData.get("_method")=== "delete"){
    console.log(params.id)
    await db.post.delete({ where:{id: params.postId } });
  }
  return redirect(`/posts`)
};

  function Post() {
    // const params = useParams()
    const {post} = useLoaderData()
    return(
      <div>
        <div className="page-header">
        <h1>{post.title}</h1>
        <Link to='/posts' className='btn btn-reverse'>
          Back
        </Link>
        </div>
        <div className="page-content">
          {post.body}
        </div>
        <div className="page-footer">
          <form method="POST">
            <input type="hidden" name="_method" value="delete"/>
            <button className="btn btn-delete">Delete</button>
          </form>
        </div>
      </div>
    )
  }
  export default Post;