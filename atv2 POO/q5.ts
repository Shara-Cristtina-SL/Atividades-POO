class ControledeAudio{
    volume: number = 0;

    aumentarVolume(): number {
        if(this.volume<10){
            return this.volume +1
        }else{
            return 10
        }
    }
    diminuirVolume(): number {
        if(this.volume>0){
            return this.volume -1
        }else{
            return 0
        }
    }

    lerVolume(): void {
        console.log("Volume: " + this.volume);
    }
}


let controle: ControledeAudio = new ControledeAudio();
controle.volume = 2;

//Aumenta volume em 1
controle.volume = controle.aumentarVolume()
controle.lerVolume()
//Diminui volume em 1
controle.volume = controle.diminuirVolume()
controle.lerVolume()
  