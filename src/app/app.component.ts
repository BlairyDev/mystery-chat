import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mystery-chat';
  private messageSubscription: Subscription;
  messages: string[] = [];
  newMessage: string = '';

  constructor(private socketService: SocketService) {
    this.messageSubscription = this.socketService
      .on("message")
      .subscribe((data) => {
        this.messages.push(data.text);
      });

  }

  sendMessage() {
    this.socketService.emit("message", { text: this.newMessage });
    this.newMessage = "";
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }




}
