import React, { Component } from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "./HomePage.scss";
import CrudServices from '../Services/CrudServices';

const Service = new CrudServices();

export default class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            UseId: '',
            UserName: '',
            Age: '',
            DataRecord: [],
            updateFlag: false
        }
    }

    componentWillUnmount() {
        console.log("Component Will Mount Calling");
        this.ReadRecord();

    }

    ReadRecord() {
        Service.ReadRecord().then((data) => {
            console.log(data);
            console.log(data.data.ReadRecordData);
            this.setState({ DataRecord: data.data.ReadRecordData })
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            console.log(this.state)
        })
    }

    handleClick = () => {
        if (this.state.UserName === '' || this.state.Age === '') {
            console.log("Input Field Is Empty");
            return;
        }

        console.log("Data : ", this.state);

        if (this.state.updateFlag == false) {
            const data = {
                userName: this.state.UserName,
                Age: Number(this.state.Age),
            }
            Service.CreateRecord(data).then((data) => {
                console.log(data)
                this.ReadRecord()
            }).catch((error) => {
                console.log(error);
            })
        } else {
            const data = {
                "id": Number(this.state.UserId),
                "userName": this.state.userName,
                "age": Number(this.state.Age),
            }

            Service.UpdateRecord(data).then((data) => {

                console.log(data)
                this.ReadRecord()
            }).catch((error) => {
                console.log(error)
            })

        }

        this.setState({ updateFlag: false, UserName: '', Age: '' })

    }

    handleEdit = (data) => {
        this.setState({ UserName: data.userName, Age: data.age, UserId: data.id, updateFlag: true })
    }

    handleDelete = (datas) => {
        const data =
        {
            id: Number(datas.id),
        }
        Service.DeleteRecord(data).then((data) => {
            console.log(data)
            this.ReadRecord()
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        let state = this.state;
        let Self = this
        return (
            <div className='MainContainer'>
                <div className='SubContainer'>
                    <div className='Box1'>
                        <div className='Input-Container'>
                            <div className='flex-Container'>
                                <TextField
                                    fullWidth
                                    label="UserName"
                                    name="UserName"
                                    size="small"
                                    variant="outlined"
                                    value={state.UserName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='flex-Container'>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="Age"
                                    size="small"
                                    variant="outlined"
                                    value={state.Age}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='flex-button'>
                                <Button variant="contained" color="secondary" onClick={this.handleClick}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='Box2'>
                        {

                            Array.isArray(this.state.DataRecord) && this.state.DataRecord.length > 0 ?
                                this.state.DataRecord.map(function (data, index) {
                                    return (
                                        <div className='data-flex'>
                                            <div key={index} className='UserId'>{data.id}</div>
                                            <div className='UserName'>{data.userName}</div>
                                            <div className='Age'>{data.age}</div>
                                            <div className='Update'>
                                                <Button variant="outlined"
                                                    color="primary"
                                                    onClick={() => { Self.handleEdit(data) }}>
                                                    <EditIcon />
                                                </Button>
                                            </div>

                                            <div className='Delete'>
                                                <Button variant="outlined"
                                                    //color="primary"
                                                    onClick={() => { Self.handleDelete(data) }}>
                                                    <DeleteIcon />
                                                </Button>
                                            </div>

                                        </div>

                                    )
                                }) :
                                <div></div>
                        }
                    </div>
                </div>
            </div >
        );
    }
}


