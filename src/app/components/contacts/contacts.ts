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
      this.contactService.create(this.newContact).subscribe(res=> {
        this.GetAllContacts()
        this.closeNewModal();
      });
    }
  }

    GetAllContacts(){
      console.log("get all contacts called");
          this.contactService.getAllForCustomer().subscribe(res =>{ 
            if (res !== null)
              this.contacts = res;});
      }
    
    deleteContact(contactId:number){
      console.log("delete clicked ", contactId);
      this.contactService.delete(contactId).subscribe(res=>
        this.GetAllContacts());
    }
    
  openEditModal(contact: Contact) {
    this.editingContact = {...contact}; // Kopie bearbeiten
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
      this.contactService.update(this.editingContact.id, this.editingContact).subscribe({
        next: () => {
          this.GetAllContacts();
          this.closeEditModal();
          console.log("update done");
        },
        error: err => console.error(err)
      });
    }
  }
}