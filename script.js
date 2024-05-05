let totalPrice = document.getElementById("total");
let seats = document.getElementById("seats");
let session;
let total = 0;
let priorDate;
let date;
let time;

const logan = {
    session1: [["A1", "A2", "A3", "A4"]/*purchased seats*/, []/*selected seats*/, "13/06", "11:00"],
    session2: [["B1", "B2", "B3", "B4"]/*purchased seats*/, []/*selected seats*/, "13/06", "14:00"],
    session3: [["C1", "C2", "C3", "C4"]/*purchased seats*/, []/*selected seats*/, "13/06", "17:00"],
    session4: [["D1", "D2", "D3", "D4"]/*purchased seats*/, []/*selected seats*/, "13/06", "20:00"],
}
totalPrice.textContent = `R$ ${total},00`

function displaySessions(selectedDate){
    if(priorDate != null && priorDate != selectedDate){
        document.getElementById(priorDate).style.display = "none";
    }

    date = document.getElementById(selectedDate);
    if(date.style.display == "none"){
        date.style.display = "block";
        priorDate = selectedDate;
    }
    
    else{
        date.style.display = "none";
        priorDate = selectedDate;
    }

}

function displayDateArea(){
    const dateArea = document.getElementById("date-area");
    const overlay = document.getElementById("overlay");
    dateArea.style.display = "block";
    overlay.style.display = "block";
}

function closeDateArea(){
    const dateArea = document.getElementById("date-area");
    const overlay = document.getElementById("overlay");
    dateArea.style.display = "none";
    overlay.style.display = "none";
}

function displayChoiceArea(value){
    session = value;

    for(let i of document.getElementsByClassName("seat")){
        i.style.backgroundColor = "rgb(24, 201, 5)";
        i.style.cursor = "pointer";
    }

    document.getElementById("unavailable").style.backgroundColor = "red";

    for(let i of session[0]){
        purchased = document.getElementById(i)
        purchased.style.backgroundColor = "red";
        purchased.style.cursor = "regular";
    }

    const dateArea = document.getElementById("date-area");
    const choiceArea = document.getElementById("choice-area")
    dateArea.style.display = "none";
    choiceArea.style.display = "block";
}

function closeChoiceArea(){
    const choiceArea = document.getElementById("choice-area")
    const overlay = document.getElementById("overlay");
    choiceArea.style.display = "none";
    overlay.style.display = "none";
    session[1] = [];
    totalPrice.textContent = `R$ ${total},00`
    purchase();
}


function clickSeat(seat){
    const selectedSeat = document.getElementById(`${seat.id}`)

    if (session[0].includes(seat.id)){
        return;
    }

    else{
        if (session[1].includes(seat.id) != true){
            selectedSeat.style.backgroundColor = "#8B008B";
            session[1].push(selectedSeat.id);
            seats.textContent = session[1].join(" ");
            total += 30;
            totalPrice.textContent = `R$ ${total},00`
            return;
        }
        
        else{
            selectedSeat.style.backgroundColor = "rgb(24, 201, 5)";
            session[1] = session[1].filter((chosenSeat) => chosenSeat != seat.id)
            seats.textContent = session[1].join(" ");
            total -= 30;
            totalPrice.textContent = `R$ ${total},00`
            return;
        }
    } 
}

function purchase(){
    
    for(let boughtSeat of session[1]){
        boughtSeat = document.getElementById(boughtSeat);
        session[0].push(boughtSeat.id);
        session[1] = session[1].filter((seats) => seats != boughtSeat.id)
    }

    for(let boughtSeat of session[0]){
        boughtSeat = document.getElementById(boughtSeat);
        boughtSeat.style.backgroundColor = "red";
        boughtSeat.classList.add("purchased");
    }

    total = 0;
    totalPrice.textContent = `R$ ${total},00`
    seats.textContent = session[1].join(" ");
}