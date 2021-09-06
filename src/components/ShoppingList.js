import { makeStyles } from '@material-ui/core/styles';
import SingleShoppingListItem from './SingleComponents/SingleShoppingListItem';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core"
import {connect} from "react-redux"
import {RiErrorWarningFill} from 'react-icons/ri';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
        minHeight: "40px",
        borderRadius: "5px",
        width: "280px",
        border: "8px solid #1EA4CE",
        background: "white",
        paddingTop: "10px",
        float: "right",
        "@media screen and (min-width: 1280px)": {
            marginTop: "20px",
        },
    },
    innerBox: {
        height: "100%",
        width: "100%", 
        maxHeight: "360px",
        overflowY: "auto",
    },
    emptyText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "orange",        
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
    },
    clearButton:{
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px",
        textTransform: "none"
    },
    buttonColor: {
        color: "#ba000d"
    }
}));


const ShoppingList = ({total, productsInList, clearShoppingBox}) => {
    const classes = useStyles();    
    return (
        <div className={classes.box}>
            {productsInList.length === 0 && <div className={classes.emptyText}><RiErrorWarningFill size={30}/> Basket is empty.</div>}
            <div className={classes.innerBox}>{productsInList.map((productInList) => <SingleShoppingListItem productID={productInList.added} productName={productInList.name} amount={productInList.amount} productPrice={productInList.price}/>)}</div>
            {productsInList.length !== 0 && <Grid container>
                <Grid item xs={7}></Grid>
                <Grid item xs={5}><div className={classes.totalAmount}>₺ {total.toFixed(2) === "-0.00" ? "0.00" : total.toFixed(2)}</div></Grid>
            </Grid>}
            {productsInList.length !== 0 && <div className={classes.clearButton}><Button className={classes.buttonColor} onClick={()=> clearShoppingBox()} size="small" variant="outlined" color="secondary" >Clear Shopping Box</Button></div>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return{total: state.total, productsInList: state.productsInList}
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearShoppingBox: () => dispatch({type: "CLEAR_SHOPPING_BOX"})
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);