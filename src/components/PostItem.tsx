import { IPost } from "../model/IPost";
import { FC} from "react";

interface PostItemProps {
    item: IPost,
    remove: (post: IPost) => void,
    update: (post: IPost) => void,
}

const PostItem: FC<PostItemProps> = ( {item, remove, update} ) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation();
        remove(item);
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const newText = prompt() || "";
        update({...item, body:newText});
    }

    return (
        <div className="post" onClick={handleUpdate}>
            <div>
                <p><b>{item.id}. {item.title}</b></p>
                <p><i>{item.body}</i></p>
            </div>
            <div className="padding2">
                <button className="postBtn" onClick={handleRemove}>DELETE</button>
            </div>
        </div>
    );
}
export default PostItem;
