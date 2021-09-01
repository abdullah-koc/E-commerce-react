import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    radioBox: {
        width: "270px",
        height: "270px",
        "@media screen and (max-width: 960px)": {
            width: "90%"
        },
        background: "white",
        paddingLeft: "20px",
        paddingTop: "10px"
    },
    margin:{
        marginTop: "10px",
        marginBottom: "4px"
    },
    marginTop: {
        marginTop: "24px"
    }
}));

export default function SortingRadio() {
    const classes = useStyles();
    const [value, setValue] = React.useState('lowToHigh');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <h5>Sorting</h5>
            <div className={classes.radioBox}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <div className={clsx(classes.margin, classes.marginTop)}><FormControlLabel value="lowToHigh"  control={<Radio color="default"/>} label="Price low to high" /></div>
                        <div className={classes.margin}><FormControlLabel value="highToLow" control={<Radio color="default"/>} label="Price high to low" /></div>
                        <div className={classes.margin}><FormControlLabel value="newToOld" control={<Radio color="default"/>} label="New to old" /></div>
                        <div className={classes.margin}><FormControlLabel value="oldToNew" control={<Radio color="default"/>} label="Old to new" /></div>
                    </RadioGroup>
                </FormControl>
            </div>
        </>
    );
}