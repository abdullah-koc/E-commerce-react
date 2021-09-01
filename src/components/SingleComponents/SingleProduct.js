import { makeStyles } from '@material-ui/core/styles';
import exampleImage from "../../images/exampleImage.png"
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    productBox: {
        width: "135px",
        marginTop: "10px",
        marginBottom: "10px"
    },
    productImg: {
        maxWidth: "90px",
        height: "90px",
    },
    imgContainer: {
        width: "120px",
        height: "106px",
        maxHeight: "120px",
        border: "1px solid #F4F4F4",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px",
    },
    price: {
        color: "#1EA4CE",
        marginTop: "12px",
        marginBottom:"4px"
    },
    addButton: {
        background: "#1EA4CE",
        textTransform: "none",
        marginTop: "5px",
        width: "120px",
        height: "20px",
        color: "white",
        border: "none",
        borderRadius: "2px",
        '&:hover': {
            backgroundColor: '#1EA4CE',
            boxShadow: 'none',
        },
    },
    productName:{
        fontSize: "14px",
        maxWidth: "124px",
        height: "30px",
        overflowWrap: "break-word"
    }

}));

const SingleProduct = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.productBox}>
            <div className={classes.imgContainer}>
                <div className={classes.productImg}>
                    <img src={exampleImage} alt="" />
                </div>
            </div>
            <div className={classes.price}>₺ {props.price}</div>
            <div className={classes.productName}>{props.productName}</div>
            <div ><Button className={classes.addButton} onClick={() =>console.log("tıklandı")}>Add</Button></div>
        </div>
    );
}

export default SingleProduct;