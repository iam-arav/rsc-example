import React from 'react';
import { posts } from './data';
import CommentForm from './CommentForm';
async function getPost(id) {
  await new Promise((resolve) => setTimeout(resolve, 200)) // fake latency
  return posts.find((p) => p.id === id)
}

export default async function Page({params}) {
  console.log('params', params)
  const {id} = await params;
    const post = await getPost(id)

  if (!post) {
    return <main style={{ padding: '2rem' }}><h1>Post not found</h1></main>
  }
  return (
    <main style={{ padding: '2rem', maxWidth: '600px', fontFamily: 'sans-serif' }}>
      <h1>{post.title}</h1>
      <p style={{ lineHeight: '1.6', color: '#444' }}>{post.content}</p>

      <section style={{ marginTop: '3rem' }}>
        <h3>Discussion ({post.comments.length})</h3>
        <ul style={{ paddingLeft: '1.2rem', marginBottom: '2rem' }}>
          {post.comments.map((comment) => (
            <li key={comment.id} style={{ marginBottom: '0.5rem' }}>{comment.text}</li>
          ))}
        </ul>

       
        <CommentForm postId={post.id} />
      </section>
    </main>
  )
}

