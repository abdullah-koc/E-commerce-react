import './App.css';
import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from "./components/Navbar"
import ShoppingList from './components/ShoppingList';
import SortingRadio from './components/SortingRadio';
import SingleProduct from './components/SingleComponents/SingleProduct';
import axios from "axios"
import BrandsFilter from './components/BrandsFilter';
import TagsFilter from './components/TagsFilter';
import loadingGIF from "./images/loading.gif"
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Pagination from '@material-ui/lab/Pagination';



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
  shoppingList: {
    float: "right",
    marginRight: "220px",
    "@media screen and (max-width: 1500px)": {
      display: "none"
    },
  },
  paginate: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    marginLeft: "-20px",
    marginTop: "10px",
  },
  container: {
    zIndex: "-1",
    position: "absolute",
    top: "75px",
    width: "90%",
    marginLeft: "50px",
    marginTop: "40px",
    "@media screen and (min-width: 1280px)": {
      marginLeft: "100px",
      width: "100%",
    },
    "@media screen and (max-width: 1280px)": {
      marginLeft: "60px",
    },
    "@media screen and (max-width: 960px)": {
      marginLeft: "32px",
    },
    "@media screen and (max-width: 600px)": {
      marginLeft: "36px",
    },
    "@media screen and (max-width: 480px)": {
      marginLeft: "28px",
    },
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

function App() {
  const classes = useStyles();

  const [mugProducts, setMugProducts] = React.useState([]);
  const [shirtProducts, setShirtProducts] = React.useState([]);
  const [allProducts, setAllProducts] = React.useState([]);
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
    axios.get("https://getirserver.herokuapp.com/api/products").then((response) => setAllProducts(response.data))
  }, []);

  React.useEffect(() => {
    if (allProducts.length !== 0) {
      setLoading(false)
    }
  }, [allProducts])


  React.useEffect(() => {
    var mugs = [];
    var shirts = [];
    allProducts.map((product) => {
      if (product.itemType === "mug") {
        mugs.push(product)
      }
      else {
        shirts.push(product)
      }
    })
    setMugProducts(mugs);
    setShirtProducts(shirts)
  }, [allProducts])

  React.useEffect(() => {
    setCurMugs(mugProducts.slice(mugPage * 16, (mugPage + 1) * 16))
    setCurShirts(shirtProducts.slice(shirtPage * 16, (shirtPage + 1) * 16))
    setPagesMug(Array.from(Array(Math.ceil(mugProducts.length / 16)).keys()))
    setPagesShirt(Array.from(Array(Math.ceil(shirtProducts.length / 16)).keys()))
  }, [mugProducts,shirtProducts, mugPage, shirtPage])

  React.useEffect(() => {
    setPagesMug(Array.from(Array(Math.ceil(mugProducts.length / 16)).keys()))
    setPagesShirt(Array.from(Array(Math.ceil(shirtProducts.length / 16)).keys()))
  }, [mugProducts, shirtProducts])


  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={2}>
            <Grid container>
              <Grid item xs={12} sm={6} md={4} lg={12}><div ><SortingRadio /></div></Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}><div ><BrandsFilter /></div></Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}><div ><TagsFilter /></div></Grid>
            </Grid>
          </Grid>
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
                {mugOrShirt ? curShirts.map((product => <Grid key={product.added} item xs={6} sm={4} md={3}><SingleProduct productName={product.name} price={product.price} /></Grid>)) :
                  curMugs.map((product => <Grid key={product.added} item xs={6} sm={4} md={3}><SingleProduct productName={product.name} price={product.price} /></Grid>))}
                <Grid className={classes.paginate} item xs={12}>
                  {!mugOrShirt && <Pagination count={pagesMug.length} shape="rounded" onChange={handleMugChange} />}
                  {mugOrShirt && <Pagination count={pagesShirt.length} shape="rounded" onChange={handleShirtChange} />}
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} lg={4} >
            <div className={classes.shoppingList}>
              <ShoppingList />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
