import React from 'react';
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {MyPostPropsType} from "./MyPostsContainer";
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../../assets/FormsControls';


let maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props: MyPostPropsType) => {

    const addPost = (value: any) => {
        props.addPost(value.newPost)
    }
    const postElements = props.posts.map(p =>
        <Post
            key={p.id}
            id={p.id}
            message={p.message}
            likeCount={p.likeCount}
            img={p.img}
        />)
    return (
        <div className={s.postBlock}>
            <hr/>
            {postElements}
            <hr/>
            <h3>My post</h3>
            <PostReduxForm onSubmit={addPost} />
        </div>
    )
})

export const PostForm = (props: any) => {

    return (
        <form
            onSubmit={props.handleSubmit}>
            <Field
                name="newPost"
                component={Textarea}
                placeholder={'enter your message'}
                type={'text'}
                validate={[required, maxLength10,]}/>
            <button>Add post</button>
        </form>
    )
}
const PostReduxForm = reduxForm({form: 'contact'})(PostForm)
export default MyPosts;
