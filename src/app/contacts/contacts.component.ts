import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Connection, Response, AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  connection: Connection = null;
  private contactsUrl = 'https://apicontacts.devotics.io/contacts';
  private infoUrl = 'https://apicontacts.devotics.io/info';
  constructor(private http: HttpClient,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private appService: AppService) {
    this.connection = {
      connections: []
    };
  }

  ngOnInit() {
    this.fetchContacts();
    this.fetchUserInfo();
  }

  private processNewConnections(connections: any[]): any[] {
    connections.map((connection) => {
      if (!connection.emailAddresses || connection.emailAddresses.length === 0) {
        connection.emailAddresses = [{
          value: 'abc@xyz.com'
        }];
      }

      if (!connection.phoneNumbers || connection.phoneNumbers.length === 0) {
        connection.phoneNumbers = [{
          value: '001212121'
        }];
      }

      if (!connection.names || connection.names.length === 0) {
        connection.names = [{
          displayName: 'Unknown'
        }];
      }
    });

    return connections;
  }

  private createContactsUrl(): string {
    if (this.connection && this.connection.nextPageToken) {
      return `${this.contactsUrl}?nextPageToken=${this.connection.nextPageToken}`;
    }
    return this.contactsUrl;
  }

  private setHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    const userId = this.appService.getUserId();
    headers = headers.append('user-id', userId);
    return headers;
  }

  private fetchUserInfo() {
    this.http.get(this.infoUrl, { headers: this.setHeaders() })
      .subscribe((data: any) => {
        console.log('USER INFO', data);
      }, (err) => {
        console.log('Errr', err);
      });
  }

  fetchContacts() {
    this.spinnerService.show();
    this.http.get(this.createContactsUrl(), { headers: this.setHeaders() })
      .subscribe((data: Response) => {
        this.connection.connections = this.connection.connections.concat(this.processNewConnections(data.data.connections));
        this.connection.nextPageToken = data.data.nextPageToken;
        this.connection.totalItems = data.data.totalItems;
        this.connection.totalPeople = data.data.totalPeople;
        this.toastrService.success('Scroll down to see new contacts', 'Success');
        this.spinnerService.hide();
      }, (err) => {
        this.spinnerService.hide();
        // return;
        if (err.error.data === 'Error: No access, refresh token or API key is set.' || err.error.data === 'logged out') {
          this.toastrService.warning('You are logged out! Re-login again', 'Warning!');
          setTimeout(() => {
            window.location.href = 'https://apicontacts.devotics.io/';
          }, 1000);
        } else {
          this.toastrService.error('Error occured, please re-login', 'Failed');
        }
      });
  }

}
