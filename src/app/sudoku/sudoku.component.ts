import { Component, OnInit } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css', '../app.component.css']
})
export class SudokuComponent implements OnInit {

  width!: number;
  height!: number;
  squares!: number[][];
  difficulty!: number;//1==easy,2==medium;3==hard;4==expert
  solution!: number[][];

  constructor() { }

  ngOnInit(): void {
    this.difficulty=4;
  }
  setDifficulty(){
    this.difficulty=this.difficulty-.5;
    if(this.difficulty==2){
      this.difficulty=4;
    }
  }
   BoxNumberDeterminer(i: number,j:number){
      var boxnum;
      if(i<3){boxnum=Math.ceil((j+1)/3)}
      else if(i<6){boxnum=Math.ceil((j+1)/3)+3}
      else(boxnum=Math.ceil((j+1)/3)+6)
      return boxnum;
    }
  boxChecker(i:number,j:number,B:Array<Boolean>){
    var boxnum=this.BoxNumberDeterminer(i,j)
    while(i>=0&&boxnum==this.BoxNumberDeterminer(i,j)){
      while(boxnum==this.BoxNumberDeterminer(i,j)){
        B[this.squares[i][j]]=true
        j--;
      }
      j=j+3
      i--
    }
  }
  boxRemover(i:number,j:number,B:Array<Boolean>){
    var boxnum=this.BoxNumberDeterminer(i,j)
    while(i>=0&&boxnum==this.BoxNumberDeterminer(i,j)){
      while(boxnum==this.BoxNumberDeterminer(i,j)){
        B[this.squares[i][j]]=false
        j--;
      }
      j=j+3
      i--
    }
  }
  
  generatePuzzle(difficulty: number){

  this.squares=[
    [],[],[],
    [],[],[],
    [],[],[],
  ]

    this.width = 9;
    this.height = 9;
    for(var i=0;i<this.height;i++){
      for(var j=0;j<this.height;j++){
        this.squares[i][j]=0
      }
    }
    var validEntryB = new Array(10).fill(false)
    for (var i: number = 0; i < this.height;i++) {
      this.squares[i] = [];
       for (var j: number = 0;  j < this.width;) {
         if(this.difficulty==4||this.difficulty==2.5){if(i>0){this.colChecker(i-1,j,validEntryB)}}
         if(this.difficulty==3.5||this.difficulty==2.5){if(j>0){this.rowChecker(i,j-1,validEntryB)}}
         if(this.difficulty==3||this.difficulty==2.5){this.boxChecker(i,j,validEntryB)}
        console.log(validEntryB)
        var n=Math.floor(Math.random()*9+1)
        if(!validEntryB[n]){
          this.squares[i][j] = n
          this.colRemover(i,j,validEntryB);
          this.rowRemover(i,j,validEntryB);
          this.boxRemover(i,j,validEntryB);
          j++;
        }
      }
    }
  }  
    colChecker(i:number,j:number,B:Array<boolean>){
      while(i>=0){
        B[this.squares[i][j]]=true;
        i--;
      }
    }
    colRemover(i:number,j:number,B:Array<Boolean>){
      while(i>=0){
        B[this.squares[i][j]]=false;
        i--;
      }
    }
    rowChecker(i:number,j:number,B:Array<boolean>){
      while(j>=0){
        B[this.squares[i][j]]=true;
        j--;
      }
    }
    rowRemover(i:number,j:number,B:Array<Boolean>){
      while(j>=0){
        B[this.squares[i][j]]=false;
        j--;
      }
    }

/* generates individual rows with nums 1-9 in rand order.
this.width = 9;
    this.height = 9;
    var validEntryB = new Array(10).fill(false)
    for (var i: number = 0; i < this.height; i++) {
      this.squares[i] = [];
      for (var j: number = 0;  j < this.width;) {
        var n=Math.floor(Math.random()*9+1)
        if(!validEntryB[n]){
          this.squares[i][j] = n
          validEntryB[n]=true
          j++;
        }
      }
      for(var k: number=0;k<validEntryB.length;k++){
        validEntryB[k]=false;
      }
    } */

    /*
  var validEntryC = new Array(9)//confirms a valid entry for the collums
  var newI=true;
    for(var i=0; i<9;){
      for (var j=0; j<9;){
        if(newI){
          newI=false;
          this.BoxChecker(this.BoxNumberDeterminer(i,j),validEntryB)//mark invalid every number already in box
          this.ColChecker(validEntryC,i,j,validEntryB)//mark invalid every number in collumn, saving those numbers, in case of box and column overlap
        }
        var n=Math.floor(Math.random()*9+1);  
        if(validEntryB[n]==false){
          this.squares[i][j]==n
          validEntryB[n]=true
          this.ColRemover(validEntryC,validEntryB)
          j++
          newI=true
        }
      }
      for(var k=0;k<validEntryB.length;k++){
        validEntryB[k]=false;
      }
      j++;
    }*/
  
    
  /*
  Above is code that I actually wrote bassed on the pseudocode blow
  the above is the true code for generating a puzzle, to be tested once I can
  see the base numbers in the grid.
  /*

How Sudoku Works
  1 2 3
  4 5 6
  7 8 9

    this.width=9;
    this.height=9;

  }

  BoxChecker(boxnum:number,B:Array<boolean>){
      var vert=0;
      var horz=0;
      if(boxnum<=3){vert=2}
      else if(boxnum<=6){vert=5}
      else{vert=8}//last index of col where the box ends
      if(boxnum%3==1){horz=2}
      if(boxnum%3==2){horz=5} 
      if(boxnum%3==0){horz=8}//last index of row where box ends
      var i=0;
      var j=horz;
      while(j>vert-3){
        if(this.squares[j][horz-i]>0){
          B[this.squares[j][horz-i]]=true;
        }
        i++;
        if(i==3){
          j--;
          i=0;
        }
      }
    }
    ColChecker(C: Array<number>,i:number,j:number,B:Array<boolean>){
      var k=0;
      i=i-1
      while(i>=0){
        C[k]=this.squares[i][j]
        B[C[k]]=true
        i--;k++
      }
    } 
    ColRemover(C:Array<number>,B:Array<boolean>){
      var k=0;
      while(k<C.length&&C[k]>0){
        if(C[k]>0){
          B[C[k]]=false
          C[k]=-1
        }
        k++
      }
    }
  
  

 Now with the puzzle made in Array A, transfer it to a subset of boxes(I'm not writeing this out on Thurs as I'm doing this)
 Bassically every "isCorrect" turns into whatever the coresponding spot holds in the Array

Set Dificulty:
  Easy =4
  Medium =3.3
  Hard = 3
  Expert =2.5    

  For each Box in the Grid;
    Revealed=(generate randome 0-1 num);
    if(Dificulty/9=<randnum){holding=isCorrect}
    else(holding=userInput;)

    anglular material
*/
}
