import React from "react";
import {PostsType} from "../../../../types/types";
import s from "./post.module.css"


export const Post = (props: PostsType) => {
    return (
        <div className={s.item}>
            <p className={s.message}>{props.message}</p>
            <div>
                <span>like </span>{props.likeCount}
                <div>
                    <img src={props.img} alt={'friend'}/>
                </div>
            </div>
        </div>
    )

}
export default Post;
