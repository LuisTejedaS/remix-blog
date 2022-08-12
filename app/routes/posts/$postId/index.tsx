import { useLoaderData, Link, Form } from "@remix-run/react";
import { db } from '~/utils/db.server';
import type {
  LoaderFunction,
  ActionFunction
} from "@remix-run/node";
import {
  redirect
} from "@remix-run/node";

export const loader: LoaderFunction = async ({request, params}) => {
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
  console.log(params.postId)
  if(formData.get("_method")=== "delete"){
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
        <Link to={`edit/`} className='btn btn-reverse'>
          Edit
        </Link>
        </div>
        <div className="page-content">
          {post.body}
        </div>
        <div className="page-footer">
          <Form method="post" action="?index">
            <input type="hidden" name="_method" value="delete"/>
            <button className="btn btn-delete">Delete</button>
          </Form>
        </div>
      </div>
    )
  }
  export default Post;