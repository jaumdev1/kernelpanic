import React from 'react';
import Post from './Post';

interface PostData {
  id:string;
  author: string;
  createdAt: string;
  title: string;
}

interface TableProps {
  posts: PostData[];
}

const Table: React.FC<TableProps> = ({ posts }) => {
  return (
    <div className="font-roboto  w-full flex flex-col items-center h-full p-20">

  <div className='flex flex-col gap-5 w-screen justify-center items-center sm:justify-start sm:items-start sm:w-auto p-4'>
  <h1 className='font-roboto'>Posts</h1>
  {posts.map((post, index) => (
    <Post key={index} id={post.id} author={post.author} createdAt={post.createdAt} title={post.title} />
  ))}
  </div>
</div>
  );
};

export default Table;
