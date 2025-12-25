import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../shared/contact';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html'
})
export class Contacts {
  contacts:Contact[]=[];
  
  constructor(
    private contactService: ContactService){}

  ngOnInit() {
    this.GetAllContacts();
  }

    GetAllContacts(){
          this.contactService.getAllForCustomer().subscribe(res =>{ 
            if (res !== null)
              this.contacts = res;});
      }
}
