import React from 'react';
import './App.css';
import { EmployeeList, EmployeeForm, ViewEmployee } from '../src/component/pages';
import {  CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


const theme = createTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
})

//const useStyles = makeStyles({
//    appMain: {
//        paddingLeft: '20px',
//        width: '100%'
//    }
//})

function App() {

    //const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<EmployeeList />} />
                            <Route path="/add-employee" element={<EmployeeForm />} />
                            <Route path="/update-employee/:id" element={<EmployeeForm />} />
                            <Route path="/view-employee/:id" element={<ViewEmployee />} />
                        </Routes>
                    </div>
                </Router>

            </div>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;



//interface Forecast {
//    date: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}

//function App() {
//    const [forecasts, setForecasts] = useState<Forecast[]>();

//    useEffect(() => {
//        populateWeatherData();
//    }, []);

//    const contents = forecasts === undefined
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//        : <table className="table table-striped" aria-labelledby="tabelLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th>
//                </tr>
//            </thead>
//            <tbody>
//                {forecasts.map(forecast =>
//                    <tr key={forecast.date}>
//                        <td>{forecast.date}</td>
//                        <td>{forecast.temperatureC}</td>
//                        <td>{forecast.temperatureF}</td>
//                        <td>{forecast.summary}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>;

//    return (
//        <div>
//            <h1 id="tabelLabel">Weather forecast</h1>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//        </div>
//    );

//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }
//}

//export default App;