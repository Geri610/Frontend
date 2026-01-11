import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact, ContactType } from '../../shared/contact';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule],
  templateUrl: './contacts.html'
})
export class Contacts {
  contacts: Contact[] = [];
  
  protected readonly ContactType = ContactType;
  
  editingContact: Contact | null = null;
  newContact: Contact | null = null;

  constructor(
    private contactService: ContactService){}

  ngOnInit() {
    this.GetAllContacts();
  }

  AddContact(){
    if(this.newContact !== null){
      this.contactService.createContact(this.newContact).subscribe(res=> {
        this.GetAllContacts()
        this.closeNewModal();
      });
    }
  }

  GetAllContacts(){
        this.contactService.getAllContactsForCustomer().subscribe(res =>{ 
            if (res !== null)
              this.contacts = res;});
    }
    
  deleteContact(contactId:number){
      this.contactService.deleteContact(contactId).subscribe(res=>
        this.GetAllContacts());
    }
    
  openEditModal(contact: Contact) {
    this.editingContact = {...contact};
  }

  openNewModal() {
    this.newContact = new Contact();
  }

  closeEditModal() {
    this.editingContact = null;
  }

  closeNewModal() {
    this.newContact = null;
  }

  updateContact() {
    if (this.editingContact) {
      this.contactService.updateContact(this.editingContact.id, this.editingContact).subscribe({
        next: () => {
          this.GetAllContacts();
          this.closeEditModal();
          console.log("Kontakt aktualisiert");
        },
        error: err => console.error(err)
      });
    }
  }
}