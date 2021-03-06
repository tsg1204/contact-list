import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import ContactDetail from './ContactDetail'
import NewContact from './NewContact'
import UpdateContactInfo from './UpdateContactInfo'
import ContactList from './ContactList'
const uuidv4 = require('uuid/v4');

export default function Contacts(props) {
  //sample data to start set to contacts
  let sample = [
      { id: uuidv4(), name: "Ben Blocker", phone: "4443332211", email: "test@gmail.com", photo: 'image1' },
      { id: uuidv4(), name: "Tim Smith", phone: "5557774422", email: "test2@gmail.com", photo: 'image2' },
   ]

   //set sample data as default contacts list
	const [contacts, setContacts] = useState(sample);

  //will update contact just edited and passed to updateContacts function from update page
  const updateContact = contact => {
    const newContacts = contacts.map((c) => {
      if (contact.id == c.id) {
        c = contact;
      }
      console.log(c)
      return c;
    })
    setContacts(newContacts);
  }
  
  //remove contact passed to the deleteContact by checking the id first from the contacts list 
  const deleteContact = id => {
    const newContacts = contacts.filter(item => item.id !== id);
    setContacts(newContacts);
  }

	return (
  	<div>

  	    <Switch>
          <Route exact path='/' render={() => (
        <ContactList contacts={contacts} deleteContact={deleteContact}/>
        )}/>
  	      <Route path="/contacts/add" render={(routerProps) => (
  			<NewContact  contacts={contacts} history={routerProps.history} />
  			)}/>
  	      <Route path="/contacts/:id/update" render={(routerProps) => (
        <UpdateContactInfo  contacts={contacts} contactId={routerProps.match.params.id} updateContact={updateContact} history={routerProps.history} />
        )}/>
  	      <Route path="/contacts/:id" render={(routerProps) => (
            <ContactDetail  contactId={routerProps.match.params.id} contacts={contacts} deleteContact={deleteContact} history={routerProps.history} />
            )}/>
  	      <Route path='/contacts' render={() => (
  			<ContactList contacts={contacts} deleteContact={deleteContact}/>
  			)}/>
  	    </Switch>

  	</div>
	)

  Contacts.propTypes = {
    contacts: PropTypes.array.IsRequired,
    updateContact: PropTypes.func.IsRequired,
    deleteContact: PropTypes.func.IsRequired
  };
};

// class Contacts extends React.Component {
//   render() {
//     return (
//       <div>
//       	Contacts Main
//       </div>
//     )
//   }
// }

// export default Contacts;