import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormCheck, Button, Row, Col } from 'react-bootstrap';

type State = {
  sources: { id: string; name: string }[];
  selectedSources: string[];
  byCategories: boolean;
  byAuthors: boolean;
};

class Preference extends Component<{}, State> {
  state: State = {
    sources: [],
    selectedSources: [],
    byCategories: false,
    byAuthors: false,
  };

  componentDidMount() {
    this.fetchPreferences().then(() => {
      const userString = localStorage.getItem('user');
      const token = userString ? JSON.parse(userString).accessToken : null;
      axios
        .get('http://localhost:8000/api/sources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.setState({ sources: response.data });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  fetchPreferences = async () => {
    const userString = localStorage.getItem('user');
    const userId = userString ? JSON.parse(userString).id : null;
    const token = userString ? JSON.parse(userString).accessToken : null;

    try {
      const response = await axios.get(`http://localhost:8000/api/preferences/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const preferences = response.data;
      const splitedPref = preferences.sources.split(',');
      const uniqueSources = Array.from(new Set(splitedPref)) as string[]; 
      this.setState({
        selectedSources: uniqueSources,
        byCategories: preferences.by_categories,
        byAuthors: preferences.by_authors,
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>, sourceId: string) => {
    const { selectedSources } = this.state;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.setState({ selectedSources: [...selectedSources, sourceId] });
    } else {
      this.setState({ selectedSources: selectedSources.filter(id => id !== sourceId) });
    }
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      const { sources } = this.state;
      this.setState({
        ...this.state,
        [name]: checked,
        sources: sources || [],
      });
    };



  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { selectedSources, byCategories, byAuthors } = this.state;
    const userString = localStorage.getItem('user');
    const userId = userString ? JSON.parse(userString).id : null;
    const token = userString ? JSON.parse(userString).accessToken : null;

    if (userId) {
      axios
        .put(
          `http://localhost:8000/api/preferences/${userId}`,
          {
            selectedSources,
            byCategories,
            byAuthors,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('User ID not found');
    }
  };

  render() {
    const { sources, selectedSources, byCategories, byAuthors } = this.state;

    return (
      <div>
        <h2>Preferences</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <h5>Select Preferred Sources:</h5>
              {sources.map((source) => (
                <FormCheck
                  key={source.id}
                  id={`checkbox-${source.id}`}
                  type="checkbox"
                  label={source.name}
                  value={source.id}
                  checked={selectedSources.includes(String(source.id))}
                  onChange={(event) => this.handleSourceChange(event, source.id)}
                />
              ))}
            </Col>
            <Col>
              <h5>Search By:</h5>
              <FormCheck
                  id="byCategories"
                  name="byCategories" 
                  type="checkbox"
                  label="By Categories"
                  checked={byCategories}
                  onChange={this.handleCheckboxChange}
                />
                <FormCheck
                  id="byAuthors"
                  name="byAuthors" 
                  type="checkbox"
                  label="By Authors"
                  checked={byAuthors}
                  onChange={this.handleCheckboxChange} />
            </Col>
          </Row>
          <Button type="submit" className="mt-3">
            Save Preferences
          </Button>
        </Form>
      </div>
    );
  }
}

export default Preference;
