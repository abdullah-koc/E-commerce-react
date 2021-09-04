import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleProduct from './SingleComponents/SingleProduct';
import loadingGIF from "../images/loading.gif"
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Pagination from '@material-ui/lab/Pagination';
import {connect} from "react-redux"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paginate: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      marginLeft: "-20px",
      marginTop: "10px",
    },
    productsBox: {
      width: "600px",
      background: "white",
      paddingLeft: "30px",
      "@media screen and (max-width: 1280px)": {
        width: "97%",
        marginLeft: "-10px",
        marginBottom: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      "@media screen and (min-width: 1280px)": {
        marginBottom: "20px",
        marginLeft: "70px"
      },
      "@media screen and (max-width: 600px)": {
        marginLeft: "-18px",
      },
    },
    productsText: {
      marginLeft: "70px",
      "@media screen and (max-width: 1280px)": {
        marginLeft: "0px",
      },
      "@media screen and (max-width: 600px)": {
        marginLeft: "-18px",
      },
      loadinggif: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
      }
    },
    buttons: {
      marginBottom: "20px"
    }
  
  }));

const ProductsContainer = ({allProducts, mugProducts, shirtProducts}) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [mugOrShirt, setMugOrShirt] = React.useState(false);
    const [curMugs, setCurMugs] = React.useState([])
    const [curShirts, setCurShirts] = React.useState([])
    const [mugPage, setMugPage] = React.useState(0)
    const [shirtPage, setShirtPage] = React.useState(0)
    const [pagesMug, setPagesMug] = React.useState([])
    const [pagesShirt, setPagesShirt] = React.useState([])

    const handleMugChange = (event, value) => {
        setMugPage(value - 1);
    };
    const handleShirtChange = (event, value) => {
        setShirtPage(value - 1);
    };

    React.useEffect(() => {
        if (allProducts.length !== 0) {
            setLoading(false)
        }
    }, [allProducts])


    React.useEffect(() => {
        setCurMugs(mugProducts.slice(mugPage * 16, (mugPage + 1) * 16))
        setCurShirts(shirtProducts.slice(shirtPage * 16, (shirtPage + 1) * 16))
        setPagesMug(Array.from(Array(Math.ceil(mugProducts.length / 16)).keys()))
        setPagesShirt(Array.from(Array(Math.ceil(shirtProducts.length / 16)).keys()))
    }, [allProducts, mugProducts, shirtProducts, mugPage, shirtPage])

    React.useEffect(() => {
        setPagesMug(Array.from(Array(Math.ceil(mugProducts.length / 16)).keys()))
        setPagesShirt(Array.from(Array(Math.ceil(shirtProducts.length / 16)).keys()))
    }, [mugProducts, shirtProducts])

    return (
        <Grid item xs={12} lg={6}>
            <h3 className={classes.productsText}>Products</h3>
            <div className={clsx(classes.productsText, classes.buttons)}>
                <ButtonGroup size="small">
                    <Button onClick={() => setMugOrShirt(false)}>Mug</Button>
                    <Button onClick={() => setMugOrShirt(true)}>Shirt</Button>
                </ButtonGroup>
            </div>
            <div className={classes.productsBox}>
                <Grid container>
                    {loading && <div className={classes.loadinggif}><img src={loadingGIF} alt="loading" /></div>}
                    {mugOrShirt ? curShirts.map((product => <Grid key={product.added} item xs={6} sm={4} md={3}><SingleProduct id={product.added} productName={product.name} price={product.price} /></Grid>)) :
                        curMugs.map((product => <Grid key={product.added} item xs={6} sm={4} md={3}><SingleProduct productName={product.name} id={product.added} price={product.price} /></Grid>))}
                    <Grid className={classes.paginate} item xs={12}>
                        {!mugOrShirt && <Pagination count={pagesMug.length} page={mugPage +1} shape="rounded" onChange={handleMugChange} />}
                        {mugOrShirt && <Pagination count={pagesShirt.length} page={shirtPage + 1} shape="rounded" onChange={handleShirtChange} />}
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}

const mapStateToProps = (state) => {
  return {allProducts: state.products, mugProducts: state.mugProducts, shirtProducts: state.shirtProducts}
}



export default connect(mapStateToProps)(ProductsContainer)