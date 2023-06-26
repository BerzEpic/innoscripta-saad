import React, { Component } from 'react';
import axios from 'axios';

import NewsArticle from './newsarticle.component';
import Article from '../types/article.type';

type State = {
  articles: Article[];
  error: string;
};

class News extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      articles: [],
      error: ''
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.accessToken;

    axios
      .get('http://localhost:8000/api/news', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.setState({ articles: response.data.articles, error: '' });
      })
      .catch(error => {
        console.error(error);
        this.setState({ articles: [], error: 'Failed to fetch news articles.' });
      });
  }

  render() {
    const { articles, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        {articles.map((article: Article, index: number) => (
          <NewsArticle key={article.id ?? index} data={article} />
        ))}
      </div>
    );
  }
}

export default News;
