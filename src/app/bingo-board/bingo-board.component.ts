import { Component, OnInit } from '@angular/core';

interface Square {
  term: string;
  clicked: boolean;
}

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.css']
})
export class BingoBoardComponent implements OnInit {
  // @ts-ignore
  board: Square[][];

  ngOnInit() {
    this.generateBoard();
  }

  generateBoard() {
    const words: string[] = [
      'Firewall',
      'Encryption',
      'Virus',
      'Malware',
      'Phishing',
      'Password',
      'Hacker',
      'Patch',
      'Authentication',
      'Intrusion',
      'Cybersecurity',
      'Endpoint',
      'Data breach',
      'Network',
      'Antivirus'
    ];

    this.board = [];

    for (let i = 0; i < 5; i++) {
      const row: Square[] = [];
      for (let j = 0; j < 5; j++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        row.push({ term: words.splice(randomIndex, 1)[0], clicked: false });
      }
      this.board.push(row);
    }
  }

  toggleSquare(rowIndex: number, colIndex: number) {
    this.board[rowIndex][colIndex].clicked = !this.board[rowIndex][colIndex].clicked;
  }
}
