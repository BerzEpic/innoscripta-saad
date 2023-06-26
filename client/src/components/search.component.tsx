import React, { useState } from 'react';
import axios from 'axios';

import NewsArticle from './newsarticle.component';
import Article from '../types/article.type';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Article[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8000/api/news/search?query=${query}`) 
      .then(response => setResults(response.data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {results.map(article => (
        <NewsArticle key={article.id} data={article} />
      ))}
    </div>
  );
};

export default Search;
