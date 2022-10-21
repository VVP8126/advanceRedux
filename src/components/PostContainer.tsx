import { IPost } from "../model/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer = () => {
    
    const { data: posts, isLoading, error } = postAPI.useFetchAllPostsQuery(15);
    const [createPost, { }] = postAPI.useCreatePostMutation();
    // If necessary to process loading and errors:
    // const [createPost, { error: createError, isLoading: isCreateLoading }] = postAPI.useCreatePostMutation();

    const [updatePost, { }] = postAPI.useUpdatePostMutation();
    const [deletePost, { }] = postAPI.useDeletePostMutation();

    const handleAddPost = async () => {
        const title = prompt();
        await createPost({title, body: "BLA..."} as IPost);
    }
    
    const handleRemove = (post: IPost) => {
        deletePost(post);
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div className="postContainer">
            <h1 className="centered">List of posts (Redux Toolkit used)</h1>
            { error && <h2>Error while data loading occured !</h2> }
            { isLoading && <h2>Loading ...</h2> }
            <div className="margined">
                <button onClick={handleAddPost}>Add POST</button>
            </div>
            <div className="post__list">
                { posts && 
                    posts.map(post => <PostItem remove={handleRemove} update={handleUpdate} key={post.id} item={post}></PostItem>)
                }
            </div>
        </div>
    );
}
export default PostContainer;
