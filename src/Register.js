import React, { useState } from "react";
import './Register.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';


function Register() {
    const [name, setName] = useState([]);
    const [mail, setMail] = useState([]);
    const [interests, setInterests] = useState([]);
    const [interest, setInterest] = useState([]);

    var options = {
      method: 'GET',
      url: 'https://webit-keyword-search.p.rapidapi.com/autosuggest',
      params: {q: 'paint', language: 'en'},
      headers: {
        'x-rapidapi-key': 'fa980baf01msh2690a126e7eba96p11b8a1jsn57cea142bc65',
        'x-rapidapi-host': 'webit-keyword-search.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setInterests(response.data.data.results.map(value => { return value}))
    }).catch(function (error) {
      console.error(error);
    }, []);

    var reg = {
      method: 'POST',
      url: 'https://testpostapi1.p.rapidapi.com/testBatmanApi/name/batman',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'success',
        'x-rapidapi-key': 'fa980baf01msh2690a126e7eba96p11b8a1jsn57cea142bc65',
        'x-rapidapi-host': 'testpostapi1.p.rapidapi.com'
      },
      data: {name: name, email: mail}
    };
    
    
const handleClick = (e) => {
  e.preventDefault();
      axios.request(reg).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
      
    return (
        <div>
            <form className = "app__form" onSubmit={handleClick}>
            <div className="app_input">
                <input type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="common_input" 
                placeholder="enter your name..." />
                </div>
                <div className="app_input">
                <input type="email"
                value={mail}
                name="mail"
                onChange={(e) => setMail(e.target.value)} 
                className="common_input" 
                placeholder="enter your email..." />
                </div>
                <div className="app_input">
                <Autocomplete
      
      multiple
      limitTags = {3}
      id="checkboxes-tags-demo"
      
      options={interests}
      
      style={{width: "221px"}}
      renderInput={params => (
        <TextField className="common_input"
          {...params}
          value={e => setInterest(e.target.value)}
          variant="outlined"
          label="Interests"
          placeholder="Interests"
        />
      )}
    />
    
                </div>
                <button className="btn">Register</button>
            </form>
        </div>        
    );
    
} 


export default Register;