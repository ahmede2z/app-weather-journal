/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=6679b439ceb5b23a8f76357f2550d205';

const zipElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

const showError = (error) => console.error('Some ErrorHas Been => ', error);

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerate);

/** Post Data To API */
function onGenerate(e) {

    const newZip = zipElement.value;
    const feelings = feelingsElement.value;

    getZipCodeDetails(baseURL, newZip, apiKey).then(data => {
        console.log(data);

        postDataToServer('/postData', {
            date: d,
            temp: data.list[0].main.temp,
            content: feelings
        }).then(() => {
            updateUI();
        });
    })
};

/** Get Zip Code Information From Api */
const getZipCodeDetails = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        showError(error);
    }
}

/** Post Data To Server For Saving  */
async function postDataToServer(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        showError(error);
    }
}

const getServerData = async (url = '') => {
    const request = await fetch(url);
    try {
        const myData = await request.json();
        return myData;
    } catch (error) {
        showError(error);
    }
}

/** Update UI */
const updateUI = async () => {
    console.log("a7a");
    const req = await fetch('/getData');
    try {
        const myData = await req.json();
        console.log(myData);
        dateElement.innerHTML = `Date:${myData[0].date}`;
        tempElement.innerHTML = `Temperature:${myData[0].temp}`;
        contentElement.innerHTML = `I feal:${myData[0].content}`;
    } catch (error) {
        showError(error);
    }
}