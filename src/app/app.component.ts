import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from './services/socket/socket.service';
import { FormsModule } from '@angular/forms';

type Message = {
  user: string,
  text: string,
  date: number
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'mystery-chat';
  
  userName: string = ""
  password: string = ""



}
