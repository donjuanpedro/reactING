import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      searchText: '',
      contacts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
      .then(resp => {
        this.setState({
          searchText: this.state.searchText,
          contacts: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  getFilteredContacts() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const contacts = this.state.contacts;

    //If our term is an empty string, return all contacts
    if(!term) {
      return contacts;
    }
    // Filter will return a NEW array of contacts, the contact will
    // be included in the array if the function returns true,
    // and excluded if the function returns false
    return contacts.filter(contact => {
      return contact.name.toLowerCase().search(term) >= 0;
    });
  }

  handleAddContact(attributes) {
    axios.post('http://localhost:4000/contacts', attributes)
      .then(resp => {
        this.setState({
          contacts: [...this.state.contacts, resp.data]
        });
      })
      .catch(err => console.log(err));
  }

  handleDeleteContact(_id) {
    axios.delete(`http://localhost:4000/contacts/${_id}`)
      .then(resp => {
        const newContacts = this.state.contacts.filter(contact => contact._id !== _id)

        this.setState({
          contacts: newContacts
        });
      })
      .catch(err => console.log(`ERROR! ${err}`));
  }

  render() {
    return (
      <div className="App">
        <ContactForm onSubmit={this.handleAddContact.bind(this)}/>
        <SearchBar value={this.state.searchText} onChange={this.handleSearchBarChange.bind(this)}/>
        <ContactList contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;
