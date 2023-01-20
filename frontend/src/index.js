import React from 'react';
import ReactDOM from 'react-dom';

const titleDOM = document.getElementById('title');
const form = ReactDOM.createRoot(document.getElementById('divform')); // Step 1. place the tag element to the Virtual DOM

async function sendData() {
    const url = "https://localhost:44365/api/teams";
    const form = document.getElementById('form');
    let team = { name: form.name.value, description: form.description.value, members: [] };
    let jsonObj = JSON.stringify(team);
    let obj = JSON.parse(jsonObj);
    console.log(team, jsonObj, obj);
    // send the data(jsonObj) to back back
    const res = await fetch(`${url}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            //"x-access-token": "token-value",
        },
        body: jsonObj,
    });
    form.reset();
}

function CreateTitle(title, tagElement) {
    let katitis = <h1>{title}</h1>; // JSX source ahtarmas code
    ReactDOM.render(katitis, tagElement);
}

// functional React Controlled Element - ReactElement
function CreateForm() {
    return (
        <div>
        <form id='form'>
            Name: <input name='name' type='text'></input><br />
            Description: <input name='description' type='text'></input><br />
                <h4>Members</h4>

        </form>
            <button onClick={sendData}>Save Team</button>
        </div>
    );
}

CreateTitle("Groups Team Application", titleDOM);



form.render(<CreateForm />); // Step 2. update the browser window with the changes

