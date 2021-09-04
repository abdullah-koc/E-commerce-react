import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from "clsx"
import {connect} from "react-redux"

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

const SortingRadio = ({lowToHigh, highToLow, newToOld, oldToNew}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('none');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <h5>Sorting</h5>
            <div className={classes.radioBox}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <div className={clsx(classes.margin, classes.marginTop)}><FormControlLabel onClick={()=> lowToHigh()} value="lowToHigh"  control={<Radio color="default"/>} label="Price low to high" /></div>
                        <div className={classes.margin}><FormControlLabel onClick={()=> highToLow()} value="highToLow" control={<Radio color="default"/>} label="Price high to low" /></div>
                        <div className={classes.margin}><FormControlLabel onClick={()=> newToOld()} value="newToOld" control={<Radio color="default"/>} label="New to old" /></div>
                        <div className={classes.margin}><FormControlLabel onClick={()=> oldToNew()} value="oldToNew" control={<Radio color="default"/>} label="Old to new" /></div>
                    </RadioGroup>
                </FormControl>
            </div>
        </>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        lowToHigh: () => dispatch({type: "LOW_TO_HIGH"}),
        highToLow: () => dispatch({type: "HIGH_TO_LOW"}),
        oldToNew: () => dispatch({type: "OLD_TO_NEW"}),
        newToOld: () => dispatch({type: "NEW_TO_OLD"}),
    }
}

export default connect(null, mapDispatchToProps)(SortingRadio);