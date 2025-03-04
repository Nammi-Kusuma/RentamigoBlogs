import React, { useState } from 'react';
import { Clock, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPostType } from '../types/type';

interface BlogPostProps {
  post: BlogPostType;
  onLike: (id: number) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(post.id);
  };
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${post.id}`}>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm ml-auto">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">{post.title}</h3>
        </Link>
        
        <div className={`text-gray-600 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {post.content}
        </div>
        
        <button 
          onClick={toggleExpand} 
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
          </div>
          
          <div className="flex space-x-3 text-gray-500">
            <button 
              className={`flex items-center ${post.userHasLiked ? 'text-indigo-600' : 'hover:text-indigo-600'}`}
              onClick={handleLike}
            >
              <ThumbsUp className={`h-4 w-4 mr-1 ${post.userHasLiked ? 'fill-indigo-600' : ''}`} />
              <span className="text-xs">{post.likes}</span>
            </button>
            <Link to={`/blog/${post.id}#comments`} className="flex items-center hover:text-indigo-600">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{post.comments}</span>
            </Link>
            <button className="flex items-center hover:text-indigo-600">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;