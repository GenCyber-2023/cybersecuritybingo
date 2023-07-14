import { Component, OnInit } from '@angular/core';
import * as party from "party-js";

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
      'Antivirus',
      'Authentication',
      'Backdoor',
      'Brute force',
      'Cipher',
      'Computer virus',
      'Cyber attack',
      'Cybersecurity',
      'Data breach',
      'DDoS',
      'Encryption',
      'Exploit',
      'Firewall',
      'Hacker',
      'Identity theft',
      'Malware',
      'Network security',
      'Password cracking',
      'Patch',
      'Penetration testing',
      'Phishing',
      'Ransomware',
      'Social engineering',
      'Spam',
      'Spyware',
      'Trojan horse',
      'Two-factor authentication',
      'Vulnerability',
      'Wireless security',
      'Biometrics'
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
    if (this.checkWin()) {
      this.showCelebration();
    }
  }

  checkWin(): boolean {
    const rows = this.board.length;
    const cols = this.board[0].length;

    // Check rows
    for (let i = 0; i < rows; i++) {
      let count = 0;
      for (let j = 0; j < cols; j++) {
        if (this.board[i][j].clicked) {
          count++;
        }
      }
      if (count === 5) {
        return true;
      }
    }

    // Check columns
    for (let j = 0; j < cols; j++) {
      let count = 0;
      for (let i = 0; i < rows; i++) {
        if (this.board[i][j].clicked) {
          count++;
        }
      }
      if (count === 5) {
        return true;
      }
    }

    // Check diagonals
    let countDiagonal1 = 0;
    let countDiagonal2 = 0;
    for (let i = 0; i < rows; i++) {
      if (this.board[i][i].clicked) {
        countDiagonal1++;
      }
      if (this.board[i][cols - i - 1].clicked) {
        countDiagonal2++;
      }
    }
    if (countDiagonal1 === 5 || countDiagonal2 === 5) {
      return true;
    }

    return false;
  }

  showCelebration() {
    const confettiSettings = {
      count: 1000,
      size: 3,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#FFD500FF' ]
    };

    party.confetti(document.body, confettiSettings);
  }
}
