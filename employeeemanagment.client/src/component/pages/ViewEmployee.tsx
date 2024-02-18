import React, { useEffect, useState } from "react";
import { IEmployee } from '../../interface'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import { EmployeeService } from '../../services/employeeService';
import { Container } from "@mui/material";
import { Button } from '../control'
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

//const useStyles = makeStyles((theme) => ({
//    root: {
//        flexGrow: 1,
//    },
//    paper: {
//        padding: theme.spacing(2),
//        textAlign: 'center',
//        color: theme.palette.text.secondary,
//    },
//}));

export const ViewEmployee = () => {

    //const classes = useStyles();
    const [data, setData] = useState<IEmployee>({ employeeId: 0, roleId: 0, firstName: "", lastName: "", role: "", dateJoined: new Date(), employeeNumber:0,extension:0 });
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateToREmployeeList = () => {
        navigate("/");
    }

    useEffect(() => {
        if (id != null && id != undefined && parseInt(id) != 0) {
            const fetchSelectedEmployee = async () => {
                try {
                    const employee = await EmployeeService.getById(parseInt(id));
                    setData(employee);
                }
                catch (error: any) {
                    console.log(error);
                }
            }
            fetchSelectedEmployee();
        }
    }, [])

    return (
        <Container>
            <div>
                <h1>View Employee Details</h1>
                <Button
                    text="Back"
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={navigateToREmployeeList}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper >First Name: {data.firstName}</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper >Last Name: {data.lastName}</Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper >RoleID: {data.roleId}</Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper >Date Joined: {data.dateJoined != undefined && data.dateJoined != null ? moment(new Date(data.dateJoined))
                            .utc(true)
                            .local()
                            .format("MM/DD/YYYY") : ''}</Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}