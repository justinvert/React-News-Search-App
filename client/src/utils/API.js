import axios from "axios";

// const URL ="";
// const KEY = "";

const URL = process.env.REACT_APP_DB_URL + process.env.REACT_APP_API_KEY + '&q=';

export default {
  Find: function(term, startYear, endYear) {
    return axios.get(URL 
    + term + "&begin_date=" 
    + startYear + "0101&end_date=" 
    + endYear + "1231");
  },
  UserData: function() {
    return axios.get("/api/articles");
  },
  Saved: function(data) {
    return axios.post("/api/articles", data);
  },
  Deleted: function(id) {
    return axios.delete("/api/articles" + id);
  }

};
