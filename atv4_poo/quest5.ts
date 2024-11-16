function exibir (... strings :string[]):void{
    strings.forEach(str=>{
        console.log(str);
    });
}

exibir("a","ab","abc");
exibir("a","b")
exibir("a1")
exibir("1","2","3","4","5")