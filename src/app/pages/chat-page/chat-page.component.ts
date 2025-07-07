import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket/socket.service';
import { FormsModule } from '@angular/forms';

type Message = {
  user: string,
  text: string,
  date: number
}

@Component({
  selector: 'app-chat-page',
  imports: [],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  private messageSubscription: Subscription;
  messages: Message[] = [];
  newMessage!: Message;
  userText!: string;
  userName!: string;
  


  constructor(private socketService: SocketService) {
    this.messageSubscription = this.socketService
      .on("msg:get")
      .subscribe((data) => {
        this.messages = data.msg
      })
  }

  sendMessage() {
    this.newMessage = {
      user: this.userName,
      text: this.userText,
      date: Date.now()
    }

    this.socketService.emit("msg:post", {
      user: this.newMessage.text,
      text: this.newMessage.text,
      date: this.newMessage.date
    })
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe()
  }


}
