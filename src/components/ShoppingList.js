import { makeStyles } from '@material-ui/core/styles';
import SingleShoppingListItem from './SingleComponents/SingleShoppingListItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
        minHeight: "40px",
        width: "280px",
        border: "8px solid #1EA4CE",
        background: "white",
        paddingTop: "10px",
        float: "right",
        "@media screen and (min-width: 1280px)": {
            marginTop: "20px",
        },
    },
    totalAmount: {
        width: "90px",
        height: "50px",
        border: "3px solid #1EA4CE",
        color: "#1EA4CE",
        margin: "20px",
        marginTop: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        float: "right"
    }
}));


const ShoppingList = () => {
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <SingleShoppingListItem/>
            <SingleShoppingListItem/>
            <SingleShoppingListItem/>
            <Grid container>
                <Grid item xs={7}></Grid>
                <Grid item xs={5}><div className={classes.totalAmount}>₺ 10.99</div></Grid>
            </Grid>
        </div>
    );
}

export default ShoppingList;