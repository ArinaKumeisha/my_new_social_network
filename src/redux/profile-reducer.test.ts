import { PostsType, ProfilesType } from '../types/types';
import {addPostAC, deletePostAC, InitialStateType, profileReducer, setStatusAC} from './profile-reducer';

let startState: InitialStateType
beforeEach(()=> {

        startState = {
            profile: null as ProfilesType | null,
            status: '',
            newPostText: '',
            posts: [
                {
                    id: 2,
                    message: "Hello, how are you?",
                    likeCount: 15,
                    img: "https://www.fotoprizer.ru/img_inf/st_221.jpg"
                },
                {
                    id: 1,
                    message: "It's my first post",
                    likeCount: 18,
                    img: "https://www.fotoprizer.ru/img_inf/st_221.jpg"
                },
            ] as Array<PostsType>,
            isPhoto: false
        }})

test('new add post', () =>{
const action = addPostAC('it')
    const  endState = profileReducer(startState, action)
    expect(endState.posts.length).toBe(3)
    expect(endState.posts[0].message).toBe('it')
})

test('delete post',()=>{
    const action = deletePostAC(3)
    const endState = profileReducer(startState, action)
    expect(endState.posts.length).toBe(2)
})

test('status should be correct', () =>{
    const action = setStatusAC('I like React')
    const endState = profileReducer(startState, action)
    expect(endState.status).toBe('I like React')
})



