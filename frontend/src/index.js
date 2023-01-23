import React, { useState } from 'react';
//import { useState }  from 'react'; // { useState } === { useState: React.useState }
import ReactDOM from 'react-dom/client';
import { Member } from './components/member/memberelement';
import './index.css';

//let members = [];
const title = ReactDOM.createRoot(document.getElementById('title'));
const form = ReactDOM.createRoot(document.getElementById('divform')); // Step 1. place the tag element to the Virtual DOM

function CreateTitle(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.date}</h3>
        </div>
    );
}


function MemberModel(name = '', email = '', phone = '')
{
    this.name = name;
    this.email = email;
    this.phone = phone;
}

// functional React Controlled Element - ReactElement
function CreateForm() {
    const [members, setMembers] = useState([{ name: '', email: '', phone: '' },]);

    function ShowMembers()
    {
        console.log(members);
    }

    const showMembers = () => 
    {
        console.log(members);
    }

    const addNewMember = () => {
        // what shall we do here???
        // can we do something like this? https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
        // 1. we reassign members with a new array
        // 2. we destruct the current members array to individual values ...members (array destructuring)
        // 3. the destructured array is added with the new Member() and we return a new array with all the members
        // 4. we use the setMembers method (action from useState) to update the Virtual DOM and force to update the DOM (browser) 
        //members.push(new Member()); // NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO - WRONG
        setMembers([...members, new MemberModel()]); 
    }

    const sendData  = async (e) => {
        e.preventDefault();
        const url = "https://localhost:44365/api/teams";
        const form = document.getElementById('form');
        let currentMembers = document.getElementsByClassName('members');
        for (let i = 0; i < currentMembers.length; i = i + 3) {
            let member = {
                name: currentMembers[i].value,
                email: currentMembers[i + 1].value,
                phone: currentMembers[i + 2].value
            }
            members.push(member);
        }
        console.log(currentMembers);
        let team = { name: form.name.value, description: form.description.value, members: members };
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

    let internalNo = 1;
    return (
        <div>
            <button onClick={addNewMember}>Add New Member</button>
            <form id='form' onSubmit={sendData}>
                Name: <input name='name' type='text'></input><br />
                Description: <input name='description' type='text'></input><br />
                <h4 className="underline">Members</h4>
                <div id="members">
                    {members.map((form, index) =>
                    {
                        return (
                            <Member key={index} internalNo={index} />
                        );
                    })}
                </div>
            </form>
            <button onClick={sendData}>Save Team</button>
        </div>
    );
}

title.render(<CreateTitle title="Groups Team Application" date={new Date().toLocaleTimeString()} />);
form.render(<CreateForm />); // Step 2. update the browser window with the changes

//let a = { k: 1, l: 'Hello', n: { }, m: function koukou() { console.log(k); } };