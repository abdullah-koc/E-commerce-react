import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useState } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from "react-redux"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    marginTop: {
        marginTop: "12.8px",
        fontSize: "90%"
    },
}));


const SingleBrandItem = ({companyName, count, companies, id, changeChecked}) => {
    const classes = useStyles();
    const company = companies.find((comp) => comp.account === id)
    const [isChecked, setIsChecked] = useState(company.isChecked)
    return (
        <Grid container>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Checkbox color="default" checked={isChecked} onChange={()=> {
                        setIsChecked(!isChecked)
                        changeChecked()
                    }} name={companyName} />}
                />
            </Grid>
            <Grid item xs={10}>
                <div className={classes.marginTop}>{companyName} ({count})</div>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {companies: state.companies}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {id} = ownProps;
    return {
        changeChecked: () => {
            dispatch({type: "CHANGE_CHECKED_BRANDFILTER", payload: {id}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBrandItem)