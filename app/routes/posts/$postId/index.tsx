import { useLoaderData, Link } from "@remix-run/react";
import { db } from '~/utils/db.server';
import type {
  LoaderFunction
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
          <form method="POST">
            <input type="hidden" name="_method" value="delete"/>
            <button className="btn btn-delete">Delete</button>
          </form>
        </div>
      </div>
    )
  }
  export default Post;