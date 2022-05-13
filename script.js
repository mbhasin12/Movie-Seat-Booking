const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
//console.log(ticketPrice)



function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex=[...selectedSeats].map(function(seat){
        return  [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    localStorage.setItem('selectedMoviePrice', JSON.stringify(ticketPrice))


    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //console.log(selectedSeatsCount);
}

//Get the data from local storage
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) 
    {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });

        count.innerText = selectedSeats.length
    }
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    const selectedMoviePrice = JSON.parse(localStorage.getItem('selectedMoviePrice'));

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    if (selectedMoviePrice !== null) {
        total.innerText = selectedSeats.length * selectedMoviePrice; 
    }


}

//Seat click event listener
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCount();
    }
});

//Movie Slect event listener

movieSelect.addEventListener('change', (e) => {
    console.log(e.target.value)
    localStorage.setItem('selectedMovieIndex', JSON.stringify(e.target.selectedIndex));
    ticketPrice = +e.target.value;
    updateSelectedCount();
});