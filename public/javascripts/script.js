class suitBatuGuntingKertas {
  constructor() {
    this.pilihan = ['batu', 'gunting', 'kertas'];
    this.memperbarui = document.getElementById("refresh")
    this.memperbarui.addEventListener("click", this.refreshPage.bind(this));
  }
    
  player2Choice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return this.pilihan[randomIndex];
  }
  
  winner(p1, p2) {
    if(p1 === "batu" && p2 === "gunting"){
     return "PLAYER 1 WIN";
    }else if(p1 === "batu" && p2 === "kertas"){
      return "PLAYER 2 WIN";
    }else if(p1 === "kertas" && p2 === "batu"){
      return "PLAYER 1 WIN";
    }else if(p1 === "kertas" && p2 === "gunting"){
      return "PLAYER 2 WIN";
    }else if(p1 === "gunting" && p2 === "kertas"){
      return "PLAYER 1 WIN";
    }else if(p1 === "gunting" && p2 === "batu"){
      return "PLAYER 2 WIN";
    }else{
      return "DRAW";
    }
  }
    
  refreshPage() {
    location.reload(); 
  }
    
}
  
  function pickOption(idImg) {

    let player1 = document.getElementById(idImg);
    console.log("player pilih", idImg);
    player1.style.backgroundColor = "rgb(209, 206, 206)"
    
    const gameSuit = new suitBatuGuntingKertas()
    const player2 = gameSuit.player2Choice()
    const P2 = document.getElementById(player2 + "-2")
    P2.style.backgroundColor = "rgb(209, 206, 206)"
    console.log("bot pilih", player2)
    
    const hasil = gameSuit.winner(idImg,player2)
    console.log("pemenang = ",hasil)
    const info = document.getElementById("result")
    info.innerHTML = hasil
  }
  
  
  
  