import { Link } from "@remix-run/react";
import type {
  ActionFunction} from "@remix-run/node";
import {
  redirect,
} from "@remix-run/node";
import { db } from '~/utils/db.server';



export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title: string = formData.get("title")?.toString() || '';
  const body: string = formData.get("body")?.toString() || '';
  const post: {title: string, body: string} = { title, body };

  const saved = await db.post.create({ data: post });
  return redirect(`/posts/${saved.id}`)
};


function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method='post' action="/posts/new">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Title" id="title"/>
          </div>
          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea  name="body" id="body"></textarea>
          </div>
          <button type="submit" className="btn btn-block">Add Post</button>
        </form>
      </div>
    </>
  )
}

export default NewPost;
