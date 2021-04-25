import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, CREATE_POST, } from './apollo'

export default function ExchangeRates() {

  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [ createPost ] = useMutation(CREATE_POST);

  const [state, setState] = useState({title: '', description: '',})
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if(data){
      setPosts(data.posts)
    }
  }, [data])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    const { title, description } = state;
    createPost({ 
      variables: {
        title,
        description,
      }
    });
    refetch();
    setState({ title: '', description: ''})
  }

  console.log(`posts`, posts)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <div className="posts_wrapper">
        <div>:Posts:</div>
        <ul>
          {posts && posts.map((post, i) => <li key={i}>{post.id}. {post.title} : {post.description}</li>)}
        </ul>
      </div>
      <div className="form_wrapper">
        <form>
          <label>Title: <input name={'title'} value={state.title} onChange={handleChange} /></label>
          <label>Description: <input name={'description'} value={state.description} onChange={handleChange} /></label>
          <button disabled={loading} onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}