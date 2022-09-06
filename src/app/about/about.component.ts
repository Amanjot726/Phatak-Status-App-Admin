import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  news: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDataFromNewsAPI();
  }

  getDataFromNewsAPI() {
    let url = 'https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=24c5a60e9a924705938d1cac2101590f'
    this.http.get(url).subscribe({
      next: (data) => {
        console.log(data);
        this.news = Array.from(data['articles']).map((e: any) => e);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
