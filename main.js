var latitude = document.querySelector("#latitude");
var longitude = document.querySelector("#longitude");
var botao = document.querySelector("#botao");
var voltarBtn = document.querySelector("#voltarBtn");
var container = document.querySelector(".container")
var resultado = document.querySelector("#resultado")
var salvos = document.querySelector(".salvos")
var nascer = document.querySelector("#sunriseTime")
var por = document.querySelector("#sunsetTime")

function verificarlocalStorage() {
    if(JSON.parse(localStorage.getItem('dadosSalvos').length) > 0){
        
        salvos.style.display = "flex";

        let vetor = JSON.parse(localStorage.getItem('dadosSalvos'))

        document.querySelector("#latitudeSalva").innerHTML = `${vetor[0]},`
        document.querySelector("#longitudeSalva").innerHTML = vetor[1]

        document.querySelector("#nascerSalvo p").innerHTML = vetor[2]
        document.querySelector("#porSalvo p").innerHTML = vetor[3]
    }
    else{
        salvos.style.display = "none"
    }
}

if(localStorage.getItem('dadosSalvos') != null){
    verificarlocalStorage()
}
else{
    salvos.style.display = "none"
}



function irResultado() {
    salvos.style.display = "none"
    container.style.display = "none"
    voltarBtn.style.display = "inline"
    resultado.style.display = "flex"
}

voltarBtn.addEventListener('click', function voltarFuncao() {
    container.style.display = "flex";
    resultado.style.display = "none";
    voltarBtn.style.display = "none";
    salvos.style.display = "flex"
    latitude.value = "";
    longitude.value = ""
})



botao.addEventListener('click', function getDados() {
    if(latitude.value.length != 0 && longitude.value.length != 0){
        

        fetch(`https://api.sunrise-sunset.org/json?lat=${latitude.value}&lng=${longitude.value}&formatted=0`)
        .then((Response =>{
            return Response.json()
        }))
        .then((data =>{

            


            let sunriselocalTime = new Date(data.results.sunrise);

            let sunsetlocalTime = new Date(data.results.sunset)

            let sunriseFinal = `${sunriselocalTime.getHours()}:${sunriselocalTime.getMinutes()}:${sunriselocalTime.getSeconds()}`

            let sunsetFinal = `${sunsetlocalTime.getHours()}:${sunsetlocalTime.getMinutes()}:${sunsetlocalTime.getSeconds()}`


            
            nascer.innerHTML = `O sol nasce às ${sunriseFinal} `

            por.innerHTML = `O sol se põe às ${sunsetFinal}`

            irResultado()

            
            
            //LOCALSTORAGE funcionando

            function salvarData() {
                
                localStorage.setItem('dadosSalvos', JSON.stringify([latitude.value, longitude.value, sunriseFinal, sunsetFinal]))
                
            }
            salvarData()


            verificarlocalStorage()
            irResultado()
            //
           
        }))

    }
    else{
        alert("Dados invalidos. Por favor, tente novamente.")
    }
})









