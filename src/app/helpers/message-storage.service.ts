import { Injectable } from '@angular/core';
const MESSAGE_KEY = 'auth-message';
@Injectable({
  providedIn: 'root'
})
export class MessageStorageService {

  constructor() { }

  public saveMessage(message: string): void{
    window.sessionStorage.removeItem(MESSAGE_KEY);
    window.sessionStorage.setItem(MESSAGE_KEY, message);
  }

  public getMessage(): string | null {
    return window.sessionStorage.getItem(MESSAGE_KEY);
  }
}
