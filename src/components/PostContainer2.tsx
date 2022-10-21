import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import { useState, useEffect } from "react";

const PostContainer2 = () => {
    const [limit, setLimit] = useState(7);
    const { data: posts, isLoading, error } = postAPI.useFetchAllPostsQuery(limit);
    // It's possible to add <refetch> - to update info in all components
    // const { data: posts, isLoading, error, refetch }
    
    useEffect(
        () => {
            setTimeout(() => { setLimit(3) }, 2000)
        },
        []
    );

    return (
        <div className="postContainer">
            <h1 className="centered">List of posts (decrease count in 2 sec)</h1>
            { error && <h2>Error while data loading occured !</h2> }
            { isLoading && <h2>Loading ...</h2> }
            <div className="post__list">
                { posts && 
                    posts.map(post => <PostItem update={()=>{}} remove={()=>{}} key={post.id} item={post}></PostItem>)
                }
            </div>
        </div>
    );
}
export default PostContainer2;
