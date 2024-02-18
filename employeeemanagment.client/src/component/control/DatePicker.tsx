import React from 'react';
import Grid from '@mui/material/Grid';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';

interface IProps {
    name: string;
    id: string;
    onChange: any;
    label: string;
    value: any;
    className: string;
    [key: string]: any;
}

export const DatePicker = (props: IProps) => {

    const { id, name, label, value, onChange, className, ...rest } = props;

    const convertToDefEventPara = (name: string, value: string) => ({
        target: {
            name, value
        }
    })

    return (
            <Grid container justifyContent="space-around">
                <MUIDatePicker
                    format="MM/dd/yyyy"
                    label={label}
                    value={value}
                    onChange={(date: any) => onChange(convertToDefEventPara(name, date))}
                    {...rest}
                />
            </Grid>
    )

}