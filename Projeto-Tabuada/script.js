let inputInv = document.getElementById('limptab')
let titulo = document.getElementById('titulo')
let res = document.getElementById('res')
let numtab = document.getElementById('txtn')

function clicar(){
   
    
    if(numtab.value.length == 0|| numtab.value <0 ||numtab.value > 100){
        alert('[ERRO]Digite um número de 0 a 100')
    
    }else{
        let n1 = Number(numtab.value)
        //(res.innerHTML='')Usei para não gerar uma tabuada embaixo da outra, quando gerar nova vai apagar a anterior.
        res.innerHTML=''
       
        //título da tabuada
        titulo.innerHTML = `Tabuada do ${n1}`
        
        
        for(let c = 0; c<=10; c++){
            // enquanto c for menor ou igual 10, c recebe 1
          
            res.innerHTML += `${n1}x${c}=${n1*c}<br>`
           // código responsável por fazer os cálculos e mostrar na tela
           
           if(n1%2==0){
            // se o número digitado for PAR fica azul se for ÍMPAR fica amarelo(estilização da tabuada)
            res.style.background = 'aqua'
           }else{
            res.style.background= 'yellow '
           }
    
        } 
        inputInv.style.display = ' block'
        res.style.display= 'block'
        titulo.style.display= 'block'
        //quando clicar mostrar conteúdos que escondi com o css
        
       
    }
    numtab.value =''
    numtab.focus()
     // para limpar o imput e o cursor aparecer para nova digitação 

}
// função para limpar tabuada e esconder novamente os conteúdos
function limpar(){
    
    res.innerHTML=''
    inputInv.style.display = 'none'
    res.style.display= 'none'
    titulo.style.display= 'none'
    
    numtab.value =''
    numtab.focus()
     // para limpar o imput e o cursor aparecer para nova digitação 
  
}





