document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/getTrips')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tripsTable').getElementsByTagName('tbody')[0];
            data.forEach(trip => {
                let row = tableBody.insertRow();
                let cellFrom = row.insertCell(0);
                let cellTo = row.insertCell(1);
                let cellDate = row.insertCell(2);
                cellFrom.textContent = trip.from;
                cellTo.textContent = trip.to;
                cellDate.textContent = trip.date;
            });
        })
        .catch(error => console.error('Ошибка:', error));
});