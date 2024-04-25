import React, { useState, useEffect } from 'react';
import Bash from '../../components/Bash';
import Table from '../../components/Table';
import Footer from '../../components/Footer';
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);
interface PostData {
  id: string;
  author: string;
  createdAt: string;
  title: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/posts`)
      .then(response => response.json())
      .then(data => setPosts(data.map((post: any) => ({
        id: post.id,
        author: post.author,
        createdAt: post.createdAt,
        title: post.title,

      }))));
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <Bash/>
      <Table posts={posts}/>
      <Footer />
    </div>
  );
};

export default Home;