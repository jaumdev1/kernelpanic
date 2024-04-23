import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
const formatDate = (dateString: string): string => {
  console.log(dateString);
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
const Article: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data));
  }, [id]);

  return (
    <div className='text-white font-roboto  w-full flex justify-center items-center p-4'>
      <div className='max-w-2xl flex'>
      {post ? (
        <div className='flex flex-col gap-5'>
       
          <div>
          <ReactMarkdown className="markdown no-reset " remarkPlugins={[gfm]} children={post.content} />
      </div>
      <p className='flex justify-end' >{formatDate(post.createdAt)} - {post.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default Article;