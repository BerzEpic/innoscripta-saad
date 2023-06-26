import React from 'react';
import Article from '../types/article.type';

type Props = {
  data: Article;
};

const NewsArticle: React.FC<Props> = ({ data }) => (
  <div>
    <h2>{data.title}</h2>
    <p>{data.content}</p>
  </div>
);

export default NewsArticle;
