'use client';
import React, { useTransition } from "react";
import { addComment } from './action'

const CommentForm = ({ postId }) => {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      await addComment(postId, formData);
      form.reset();
    });
  };
  return (
  <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
      <input 
        type="text" 
        name="text" 
        placeholder="Add a comment..." 
        required 
        style={{ padding: '0.5rem', flex: 1 }}
      />
      <button className={isPending ? 'bg-blue-500 text-white rounded-3xl' : 'bg-green-500 rounded-3xl text-white'} type="submit" disabled={isPending} style={{ padding: '0.5rem 1rem' }}>
        {isPending ? 'Posting...' : 'Post Comment'}
      </button>
    </form>);
};

export default CommentForm;
