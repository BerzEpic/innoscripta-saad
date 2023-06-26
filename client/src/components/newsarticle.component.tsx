import React from 'react';
import Article from '../types/article.type';
import { Card, Row, Col } from 'react-bootstrap';

type Props = {
  data: Article;
};

const NewsArticle: React.FC<Props> = ({ data }) => (
  <Card>
    <Card.Img variant="top" src={data.urlToImage} />
    <Card.Body>
      <Card.Title>{data.title}</Card.Title>
      <Card.Text>{data.content}</Card.Text>
      <Row>
        <Col>
          <p>Author: {data.author}</p>
        </Col>
        <Col>
          <p>Published At: {data.publishedAt}</p>
        </Col>
      </Row>
      <a href={data.url} target="_blank" rel="noopener noreferrer">Read More</a>
    </Card.Body>
  </Card>
);

export default NewsArticle;
