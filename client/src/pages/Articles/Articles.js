import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import  DeleteBtn  from "../../components/DeleteBtn";
import  SaveBtn  from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, Button } from "../../components/Form";


class Articles extends Component {
  state = {
    articles: [],
    searchResults: [],
    articleSaved: [],
    title: "",
    term: "",
    date: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.ArticlesCollect();
  }

  ArticlesCollect = () => {
    API.UserData()
      .then(res =>
        // this.setState({ articles: res.data })
        this.setState({ articleSaved: res.data })
      )
      .catch(err => console.log(err));
  };

  Deleted = id => {
    API.Deleted(id)
      .then(res => this.ArticlesCollect())
      .catch(err => console.log(err));
  };

  Saved = data => {
    API.Saved(data)
      .then(res => this.ArticlesCollect())
      .catch(err => console.log(err));
}; 

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term && this.state.startYear && this.state.endYear) {
      API.Find(this.state.term, this.state.startYear, this.state.endYear)
      .then(res =>
        {this.setState({
          searchResults: res.data.response.docs,
          term: "", 
          startYear: "", 
          endYear: "" });
    
        }
      )
      // .then(res => this.ArticlesCollect())
      .catch(err => console.log(err));
  }
};

  render() {
    return (
      <Container d-flex justify-content-center>
      
      <Col size="col-centered">
            <Jumbotron>
            <h1>Find Articles</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Term (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (required)"
              />
              <Button
                disabled={!(this.state.term && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Search Articles
              </Button>
            </form></Col>
     <br/>
     <Col size="col-centered">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
          {this.state.searchResults.length ? (
          <List>
                {this.state.searchResults.map(article => (
                  <ListItem key={article._id}>
                       <strong> <a href={article.web_url}> {article.headline.main.toUpperCase()}</a></strong> <br/>
                       {article.snippet}<br/>
                       Published On: {article.pub_date}
                       
             {/* <DeleteBtn onClick={() => this.Deleted(article._id)} /> */}

                 <SaveBtn onClick={() => this.Saved({
                 title: article.headline.main,
                 url: article.web_url,
               date: article.pub_date
              
               })} />

                  </ListItem>
                ))}
              </List>
            ) : (
<h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="col-centered">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articleSaved.length ? (
          <List>
                {this.state.articleSaved.map(article => (
                  <ListItem key={article._id}>
                       <strong> <a href={article.url}> {article.title.toUpperCase()}</a></strong> <br/>
                       {/* {article.snippet}<br/> */}
                       Published On: {article.date}
                       
             <DeleteBtn onClick={() => this.Deleted({id: article._id} )}/>

                 {/* <SaveBtn onClick={() => this.Saved({
                 title: article.headline.main,
                 url: article.web_url,
               date: article.pub_date
              
               })} /> */}

                  </ListItem>
                ))}
              </List>
            ) : (
<h3>No Results to Display</h3>
            )}
            </Col>
      </Container>
    );
  }
}
export default Articles;
  