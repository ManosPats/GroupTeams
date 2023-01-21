import React from 'react';
import ReactDOM from 'react-dom/client';
import { Member } from '../src/components/member/member';

const title = ReactDOM.createRoot(document.getElementById('title'));
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

function addNewMember()
{
    // what shall we do here???
    // can we do something like this? https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
}

function CreateTitle(props) {
    return (
        <h1>{props.title}</h1> 
    );
}

// functional React Controlled Element - ReactElement
function CreateForm() {
    return (
        <div>
            <button onClick={addNewMember}>Add New Member</button>
            <form id='form'>
                Name: <input name='name' type='text'></input><br />
                    Description: <input name='description' type='text'></input><br />
                    <h4>Members</h4>
                <div id="members">
                    <Member />
                </div>
            </form>
            <button onClick={sendData}>Save Team</button>
        </div>
    );
}

title.render(<CreateTitle title="Groups Team Application" />);
form.render(<CreateForm />); // Step 2. update the browser window with the changes