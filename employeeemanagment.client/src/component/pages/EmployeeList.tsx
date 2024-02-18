import React, { useState, useMemo, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from "@mui/material";
import { Button } from '../control'
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment-timezone";
import TextField from '@mui/material/TextField';
import { EmployeeHook } from '../../hooks';
import { EmployeeService } from '../../services/employeeService'
import { IEmployee } from '../../interface'

interface Column {
    id: 'firstName' | 'lastName' | 'dateJoined' | 'roleId' | 'extention' | 'edit' | 'delete' | 'view';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    {
        id: 'dateJoined',
        label: 'DateJoined',
        minWidth: 100
    },
    {
        id: 'roleId',
        label: 'RoleId',
        minWidth: 100
    },

    {
        id: 'extention',
        label: 'Extention',
        minWidth: 100
    },

    {
        id: 'edit',
        label: 'Edit',
        minWidth: 100
    },
    {
        id: 'delete',
        label: 'Delete',
        minWidth: 100
    },
    {
        id: 'view',
        label: 'View',
        minWidth: 100
    },

];

//const useStyles = makeStyles({
//    root: {
//        width: '100%',
//    },
//    container: {
//        maxHeight: 440,
//    },
//});

export const EmployeeList = () => {
    const { data: employees, loading, setData: setUser, error } = EmployeeHook(true);

    //const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');

    const navigate = useNavigate();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigateToAddEmployee = () => {
        navigate("/add-employee");
    }

    const navigateToEditEmployee = (record: any) => {
        navigate(`/update-employee/${record.employeeId}`);
    }

    const navigateToViewEmployee = (record: any) => {
        navigate(`/view-employee/${record.employeeId}`);
    }

    const deleteEmployee = async (record: any) => {
        try {
            const deleteEmployee = await EmployeeService.delete(record.employeeId);
            if (deleteEmployee.isSuccess) {
                const employeeList = await EmployeeService.getAll();
                setUser(employeeList)
            }
        }
        catch (error: any) {
            console.log(error)
        }
    }

    const filteredData = useMemo(() => {
        return employees.filter(x => !search || x.firstName.includes(search))
    }, [employees, search])

    return (
        <>
            <Container>
                <h1>Employee Information</h1>

                <Button
                    text="Add New Employee"
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={navigateToAddEmployee}
                />
                <div>&nbsp;</div>

                <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />
                <div>&nbsp;</div>

                <Paper >
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record: IEmployee) => {
                                    return (
                                        <TableRow key={record.employeeId}>
                                            <TableCell>{record.firstName}</TableCell>
                                            <TableCell>{record.lastName}</TableCell>
                                            <TableCell>{moment(new Date(record.dateJoined != undefined ? record.dateJoined! : ''))
                                                .utc(true)
                                                .local()
                                                .format("MM/DD/YYYY")}
                                            </TableCell>
                                            <TableCell>{record.roleId}</TableCell>
                                            <TableCell>{record.extension}</TableCell>
                                           
                                            <TableCell>
                                                <Button
                                                    text="Edit"
                                                    color="primary"
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => { navigateToEditEmployee(record) }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    text="Delete"
                                                    color="primary"
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => { deleteEmployee(record) }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    text="View"
                                                    color="primary"
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => { navigateToViewEmployee(record) }}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={employees.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    );
}