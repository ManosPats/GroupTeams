import React from 'react';

export class Member extends React.Component
{
    internalNo = this.props.internalNo;

    render()
    {
        return (
            <div key={this.internalNo}>
                <h4>Member - {this.internalNo + 1}</h4>
                Name: <input
                    type='text'
                    name={'name_' + this.internalNo}
                    id={'member_name_' + this.internalNo}
                    className='members' /><br />
                Email: <input
                    type='text'
                    name={'email_' + this.internalNo}
                    id={'member_email_' + this.internalNo}
                    className='members' /><br />
                Phone: <input
                    type='text'
                    name={'phone_' + this.internalNo}
                    id={'member_phone_' + this.internalNo}
                    className='members' /><br />
            </div>
        );
    }
}