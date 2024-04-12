import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODOリスト';
  messages: any[] = [];
  id: number[] = [];


  constructor(private httpClient: HttpClient) { }


  ngOnInit() {
    this.LoadMesssage();
  }

  LoadMesssage() {
    const url = 'http://localhost:3000/api/v1/messages';
    this.httpClient.get(url).subscribe({
      next: (response: any) => {
        this.messages = response;
      }
    });
  }

  public getMessageContent(message: string): void {
    const url = 'http://localhost:3000/api/v1/messages';
    this.httpClient.post(url, { message }).subscribe({
      next: (response: any) => {
        this.LoadMesssage();
        console.log('レスポンス受けました');
        this.clearInput();
      }
    });
  }

  private clearInput(): void {
    console.log('クリア始めます');
    const found = <HTMLInputElement>document.getElementById('message');
    console.log('要素見つかりました？', found);
    if (found) {
      console.log('中身消します');
      found.value = '';
    }
  }

}
