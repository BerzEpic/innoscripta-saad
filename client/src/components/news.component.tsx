import React, { Component, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormControl, Button, Pagination } from 'react-bootstrap';

import NewsArticle from './newsarticle.component';
import Article from '../types/article.type';

type State = {
  articles: Article[];
  error: string;
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  totalItems: number;
};

class News extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      articles: [],
      error: '',
      searchQuery: '',
      currentPage: 1,
      pageSize: 20, // Change this to desired number of articles per page
      totalItems: 0,
    };
  }

  componentDidMount() {
    this.fetchNewsArticles();
  }

  fetchNewsArticles = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.accessToken;

    const { searchQuery } = this.state;

    axios
      .get('http://localhost:8000/api/news', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchQuery,
        },
      })
      .then(response => {
        const { data } = response.data;
        const totalItems = data.length;
        this.setState({ articles: data, totalItems, error: '' });
      })
      .catch(error => {
        console.error(error);
        this.setState({ articles: [], totalItems: 0, error: 'Failed to fetch news articles.' });
      });
  };

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Fetch news articles with the updated search query
    this.setState({ currentPage: 1 }, this.fetchNewsArticles);
  };

  handlePaginationChange = (page: number) => {
    this.setState({ currentPage: page }, this.forceUpdate);
  };

  componentDidUpdate(prevProps: {}, prevState: State) {
    // Check if currentPage has changed
    if (prevState.currentPage !== this.state.currentPage) {
      this.forceUpdate();
    }
  }

  render() {
    const { articles, error, searchQuery, currentPage, pageSize, totalItems } = this.state;

    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // Get the articles for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentArticles = articles.slice(startIndex, endIndex);

    return (
      <div>
        <Form onSubmit={this.handleSearchSubmit}>
          <Row>
            <Col md={10}>
              <FormControl
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={this.handleSearchChange}
                className="mr-sm-2"
              />
            </Col>
            <Col md={2}>
              <Button type="submit" variant="outline-primary">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {error && <div>{error}</div>}

        <Row>
          {currentArticles.map((article: Article, index: number) => (
            <Col key={article.url + '-' + index} xs={12} md={4}>
              <NewsArticle data={article} />
            </Col>
          ))}
        </Row>

        {totalItems > pageSize && (
          <Pagination className="mt-4 justify-content-center">
            <Pagination.First onClick={() => this.handlePaginationChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev
              onClick={() => this.handlePaginationChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => this.handlePaginationChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => this.handlePaginationChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => this.handlePaginationChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    );
  }
}

export default News;
