import React from 'react';
import ReactDOM  from 'react-dom';

const titleDOM = document.getElementById('title');
const form = document.getElementById('form');

function CreateTitle(title, tagElement)
{
    let katitis = <h1>{ title }</h1>; // JSX source ahtarmas code
    ReactDOM.render(katitis, tagElement);
}

function CreateForm(tagElement)
{
    let form = 
    <form method='post' action='https://localhost:44365/api/teams'>
        Name: <input name='name' type='text'></input><br />
        Description: <input name='description' type='text'></input><br />
        <input type='submit' value='Save Team'></input>
    </form>;
    ReactDOM.render(form, tagElement);
}

CreateTitle("Groups Team Application", titleDOM);
CreateForm(form);

