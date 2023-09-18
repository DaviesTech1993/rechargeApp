let cards = JSON.parse(localStorage.getItem('recharges')) 
if (!cards) {
    cards = []
}

genBtn.addEventListener('click',()=>{
    let pin = Math.floor(Math.random()*999999999999999)
    codeInp.value = pin 


let network = networks.value;
let amount = amounts.value;
let pinCode = pin;
let status = false;
let date = new Date();
let hour = date.getHours();
let min = date.getMinutes();
let time = hour + ':' + min;
let dates = date.toLocaleDateString();
dateused = false




let codes = {
     MTN: '*555*',
     GLO: '*222*',
     AIRTEL: '*126*',
     ETISALAT: '*303*'
    }

    let coded = codes[network]

    let card = {
        network,amount,pinCode,coded,status,dates,time,dateused
    }

    cards.push(card)
})




saveBtn.addEventListener('click', ()=>{
  localStorage.setItem('CARD', JSON.stringify(cards))

  display()
})

function display(){
    cards = JSON.parse(localStorage.getItem('CARD'))

    tables.innerHTML = ''
    cards.forEach((elem, i) =>{

        tables.innerHTML +=  `   
        <tbody>
            <tr>
                <td scope="row">${i+1}</td>
                <td>${elem.network}</td>
                <td>${elem.amount}</td>
                <td>${elem.coded}${elem.pinCode}#</td>
                <td>${elem.pinCode}</td>
                <td>${elem.status ? 'USED' : 'UNUSED'}</td>
                <td>${elem.dates} ${elem.time}</td>
                <td><button class="delBTN" onclick="deletes(${i})">DELETE</button></td>
            

            </tr>
        </tbody>
            
`

       recharger.innerHTML = `
           <h2>RECHARGE HERE:</h2>

           <input class="w-100 rounded-3 border-0" type="text" name="" id="rechargeInput">
        
           <button type="button" class="rechargeBtn" onclick="recharge()">RECHARGE</button>
        `
    })

}

display()

let USED = false

function recharge(){

    let cards = JSON.parse(localStorage.getItem('CARD'))
    let found = false

    cards.forEach((elem, i) =>{
//trim
        let pins = rechargeInput.value.trim()

        let newCode = elem.coded
        let newPin = elem.pinCode
        let load = newCode + newPin + '#'

        if (pins === load){
            if(elem.status === true){
                USED = true
            }else{
                elem.status = true
                elem.dateused = true
                USED = false
               modal.style.display = "block"
            }

            found = true
        }

    })

    localStorage.setItem('CARD', JSON.stringify(cards))

    display()

    if (USED === true) {
       use.style.display = "block"
    }
    if (!found) {
        alert('PLEASE INPUT A VALID PIN')
    }
}


function deletes(id){

    cards.splice(id, 1)
    localStorage.setItem('CARD',JSON.stringify(cards))
    display()

}