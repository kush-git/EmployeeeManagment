import React, { useEffect, useState } from "react";
import { TextBox, Button, Dropdown, CheckBox, RadioGroup } from '../control'
import { IEmployee } from '../../interface'
import { useForm } from '../../hooks'
import { Grid } from "@mui/material";
import { EmployeeService, RoleService as roleService } from '../../services';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RoleHook } from '../../hooks';

// defining the initial state for the form
const initialState: IEmployee = {
    employeeId: 0, roleId: 0, firstName: "", lastName: "", role: "", dateJoined: new Date(), employeeNumber: 0, extension: 0 };

//const useStyles = makeStyles({
//    field: {
//        marginTop: 30,
//        marginBottom: 20,
//        display: 'block',
//    }
//})

export const EmployeeForm = () => {

    const { data: roles, loading, setData: setEmployee, error } = RoleHook(true);
    //const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors }
        if ('firstName' in fieldValues) {
            if (fieldValues.firstName) {
                if (!(/^[a-zA-Z]+$/).test(fieldValues.firstName)) {
                    temp.firstName = "First Name should contain only alphabets not numbers or other special characters.";
                } else {
                    temp.firstName = "";
                }
            } else {
                temp.firstName = "This field is required.";
            }
        }

        if ('lastName' in fieldValues) {
            if (fieldValues.lastName) {
                if (!(/^[a-zA-Z]+$/).test(fieldValues.lastName)) {
                    temp.lastName = "Last Name should contain only alphabets not numbers or other special characters.";
                } else {
                    temp.lastName = "";
                }
            } else {
                temp.lastName = "This field is required.";
            }
        }
        if ('email' in fieldValues) {
            if (fieldValues.email == "") {
                temp.email = "This field is required."
            }
            else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(fieldValues.email)) {
                temp.email = "Email is not valid."
            }
            else {
                temp.email = "";
            }
        }

        if ('mobile' in fieldValues) {
            if (fieldValues.mobile) {
                if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(fieldValues.mobile)) {
                    temp.mobile = "Mobile number is not valid.";
                } else {
                    temp.mobile = "";
                }
            } else {
                temp.mobile = "This field is required.";
            }
        }

        if ('departmentId' in fieldValues) {
            if (fieldValues.departmentId == 0) {
                temp.departmentId = "This field is required.";
            }
            else {
                temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required.";
            }
        }
        setErrors({
            ...temp
        })

        if (fieldValues == values) {
            if (temp.firstName == "" && temp.lastName == "" && temp.email == "" && temp.mobile == "" && temp.departmentId == "") {
                return true;
            }
        }
    }

    // getting the event handlers from our custom hook
    const { onChange, values, errors, setErrors, resetForm, setValues } = useForm(
        initialState,
        true,
        validate,
        initialState
    );

    // submit function
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validate()) {
            if (id != null && id != undefined && parseInt(id) != 0) {
                updateEmployee(values)
            }
            else {
                addEmployee(values)
            }
        }
        else {
            console.log("Form Validation Error")
        }
    }

    const addEmployee = async (values: IEmployee) => {
        try {
            const result = await EmployeeService.add(values);
            if (result.isSuccess == true) {
                navigate("/");
            }
        }
        catch (error: any) {
            console.log(error);
        }
    }

    const updateEmployee = async (values: IEmployee) => {
        try {
            const result = await EmployeeService.update(values);
            if (result.isSuccess == true) {
                navigate("/");
            }
        }
        catch (error: any) {
            console.log(error);
        }
    }

    //reset form
    const resetFormDetails = () => {
        resetForm()
    }

    //dynamic geneder values 
    const genderItems = [
        { id: 'male', title: 'Male' },
        { id: 'female', title: 'Female' },
        { id: 'other', title: 'Other' },
    ]

    const navigateToUserList = () => {
        navigate("/");
    }

    useEffect(() => {
        if (id != null && id != undefined && parseInt(id) != 0) {
            const fetchSelectedEmployee = async () => {
                try {
                    const employee = await EmployeeService.getById(parseInt(id));
                    debugger
                    setValues({
                        ...employee
                    })
                }
                catch (error: any) {

                }
            }
            fetchSelectedEmployee();
        }
    }, [])

    return (
        <>
            <Grid container justify="center" alignItems="center" direction="column" style={{ minHeight: "100vh" }}>
                {id != null && id != undefined && parseInt(id) != 0 ? <h1>Edit Employee</h1> : <h1>Add Employee</h1>}
                <form onSubmit={handleSubmit}>
                    <TextBox
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First Name"
                        value={values.firstName}
                        onChange={onChange}
                        error={errors.firstName}
                    />

                    <TextBox
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last Name"
                        value={values.lastName}
                        onChange={onChange}
                        error={errors.lastName}
                    />

                    <TextBox
                        id="email"
                        name="email"
                        type="text"
                        label="Email"
                        value={values.email}
                        onChange={onChange}
                        error={errors.email}
                        
                        fullWidth
                    />
                    <Dropdown
                        id="roleId"
                        name="roleId"
                        label="Role"
                        value={values.roleId}
                        onChange={onChange}
                        options={roles}
                        error={errors.roleId}
                       
                        fullWidth={true}
                    />

                    <Button
                        type="Submit"
                        text="submit"
                        color="primary"
                        size="small"
                        variant="contained"
                    />
                    <Button
                        text="Reset"
                        color="default"
                        size="small"
                        variant="contained"
                        onClick={resetForm}
                    />
                    <Button
                        text="Cancel"
                        color="default"
                        size="small"
                        variant="contained"
                        onClick={navigateToUserList}
                    />
                </form>
            </Grid>
        </>
    )
}