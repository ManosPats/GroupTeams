import React from 'react';

export class Member extends React.Component
{
    //constructor(internalNo = 0, name = '', email = '', phone = '')
    //{
    //    this.name = name;
    //    this.email = email;
    //    this.phone = phone;
    //    this.internalNo = internalNo;
    //}

    render()
    {
        return (
            <div>
                Name: <input type='text' name = 'name' id='member_name_{internalNo}' className='members' /><br />
                Email: <input type='text' name = 'email' id='member_email_{internalNo}' className='members' /><br />
                Phone: <input type='text' name = 'phone' id='member_phone_{internalNo}' className='members' /><br />
            </div>
        );
    }
}