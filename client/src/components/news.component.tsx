import React, { Component } from 'react';
import axios from 'axios';

import NewsArticle from './newsarticle.component';
import Article from '../types/article.type';
import { Row, Col } from 'react-bootstrap';

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
    const { articles } = this.state;

    // Split articles into chunks of 3
    const rows = [];
    for (let i = 0; i < articles.length; i += 3) {
      const rowArticles = articles.slice(i, i + 3);
      rows.push(rowArticles);
    }

    return (
      <div>
        {rows.map((rowArticles, rowIndex) => (
          <Row key={rowIndex}>
            {rowArticles.map((article: Article, index: number) => (
              <Col key={article.id ?? index} xs={12} md={4}>
                <NewsArticle data={article} />
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}

export default News;
