
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageTwo = document.querySelector('#msg-2')
const messageThree = document.querySelector('#msg-3')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    
    messageTwo.textContent = 'Loading...'
    messageThree.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                return messageTwo.textContent = 'Error: ' + data.error
    
            } else {
                console.log(data.forecast)
                messageTwo.textContent = data.forecast
                messageThree.textContent = data.location
            }
            
        })
    })

})