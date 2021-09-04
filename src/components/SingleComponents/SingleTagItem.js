import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from "react-redux"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    marginTop: {
        marginTop: "14px",
        fontSize: "90%"
    }
}));


const SingleTagItem = ({tags, tagName, tagNum, changeChecked}) => {
    const classes = useStyles();
    const tag = tags.find((item) => item.tagName === tagName)
    const [isChecked, setIsChecked] = useState(tag.isChecked)
    return (
        <Grid container>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Checkbox checked={isChecked} color="default" onChange={() => {
                        setIsChecked(!isChecked)
                        changeChecked()
                    }} name={tagName} />}
                />
            </Grid>
            <Grid item xs={10}>
                <div className={classes.marginTop}>{tagName} ({tagNum})</div>
            </Grid>
        </Grid>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {tagName} = ownProps;
    return {
        changeChecked: () => {
            dispatch({type: "CHANGE_CHECKED_TAGFILTER", payload: {tagName}})
        }
    }
}

export default connect(null, mapDispatchToProps)(SingleTagItem)