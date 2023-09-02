document.addEventListener('DOMContentLoaded', async () => {
    var form = document.querySelector('form');

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        var input = document.getElementById('newItem');

        if(input.value) {
            var newItem = {
                item: input.value,
            }

            try {
                var response = await fetch('/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newItem)
                });
    
                var data = await response.json();
                // console.log("Server staus : ", data.status);
                location.reload();
            } catch(error) {
                console.log("Error : ", error);
            }
        } else {
            message.textContent = 'Empty Todo!!';
        }
    });

    var itemsList = document.querySelectorAll('li');
    itemsList.forEach(element => {
        element.addEventListener('click', async() => {
            var itemName  = element.textContent.replace(/ /g, '-');

            try {
                var response = await fetch('/todo/' + itemName, {
                    method: 'DELETE',
                });
    
                var data = await response.json();
                // console.log("Server staus : ", data.status);
                location.reload();
            } catch(error) {
                console.log("Error : ", error);
            }
        });
    });
});