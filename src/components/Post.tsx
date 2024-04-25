import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
  id: string;
  title: string;
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

const Post: React.FC<PostProps> = ({ id, author, createdAt, title }) => {
  return (
    <Link to={`/article/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} className='font-roboto'>
      <div className="post grid gap-4" style={{ gridTemplateColumns: 'auto auto auto 1fr', cursor: 'pointer' }} 
           onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} 
           onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
        <p><span role="img" aria-label="folder">📁</span></p> 
        <p><b>{`${title}`}</b></p> 
        <p>{`${formatDate(createdAt)}`}</p> 
        <p>{`${author}`}</p>
      </div>
    </Link>
  );
};

export default Post;