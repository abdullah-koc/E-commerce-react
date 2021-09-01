import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    singleItem: {
        minHeight: "50px",
        borderBottom: "1px solid #F4F4F4",
        marginBottom: "5px",
        marginLeft: "10px",
        marginRight: "10px",
        paddingTop: "10px"
    },
    operationsContainer:{
        minHeight: "30px"
    },
    amount: {
        minWidth: "32px",
        minHeight: "32px",
        display: "flex",
        marginLeft: "0.5px",
        justifyContent: "center",
        background: "#1EA4CE",
        color: "white",
        borderRadius: "2px"
    },
    plusMinus: {
        color: "#1EA4CE",
        maxWidth: "30px",
        maxHeight: "30px",
        float: "right",
        minWidth: "30px",
        minHeight: "30px",
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'none',
        },

    },
    marginForAmount: {
        marginTop: "3px"
    },
    centerItem: {
        textAlign: "center",
    }
}));

const SingleShoppingListItem = () => {
    const classes = useStyles();
    return (
        <div className={classes.singleItem}>
            <Grid container>
                <Grid item xs={7}>
                    <div>Example Product</div>
                    <div>10 tl</div>
                </Grid>
                <Grid item xs={5}>
                    <Grid container className={classes.operationsContainer}>
                        <Grid item xs={5}><Button className={clsx(classes.centerItem, classes.plusMinus)}><AiOutlineMinus /></Button></Grid>
                        <Grid item xs={2}><div className={classes.centerItem}><div className={classes.amount}><div className={classes.marginForAmount}>5</div></div></div></Grid>
                        <Grid item xs={5}><Button className={clsx(classes.centerItem, classes.plusMinus)}><AiOutlinePlus /></Button></Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default SingleShoppingListItem;