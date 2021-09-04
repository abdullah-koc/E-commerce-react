function sortItems(arr = [], prop = "", type = 1) {
    arr.sort(
        function (a, b) {
            if (a[prop] < b[prop])
                return -1 * type;
            else if (a[prop] > b[prop])
                return 1 * type;
            else
                return 0;
        }
    )
    return arr
}

function splitMugAndShirt(products = []) {
    var mugs = [];
    var shirts = [];
    products.map((product) => {
        if (product.itemType === "mug") {
            mugs.push(product)
        }
        else {
            shirts.push(product)
        }
    })
    return {mugs, shirts}
}

const reducer = (state, action) => {
    if (action.type === "ADD_TO_CARD") {
        const tempPr = state.allProducts;
        const pr = tempPr.filter((product) => {
            if (product.added === action.payload.id) {
                return product
            }
        })
        const toAdd = pr[0]
        const temp = state.productsInList.filter((product) => (product.added === toAdd.added))
        const beforeAdd = state.productsInList;
        if (temp.length === 0) {
            beforeAdd.push(toAdd)
        }
        toAdd.amount++;

        return { ...state, total: state.total + toAdd.price, productsInList: beforeAdd }
    }
    else if (action.type === "INCREASE_AMOUNT") {
        const tempPr = state.allProducts;
        const pr = tempPr.filter((product) => {
            if (product.added === action.payload.productID) {
                return product
            }
        })
        const toIncrease = pr[0];
        toIncrease.amount++;
        return { ...state, total: state.total + toIncrease.price }
    }
    else if (action.type === "DECREASE_AMOUNT") {
        const tempPr = state.allProducts;
        const pr = tempPr.filter((product) => {
            if (product.added === action.payload.productID) {
                return product
            }
        })
        const toDecrease = pr[0];
        toDecrease.amount--;
        let tempList = state.productsInList;
        if (toDecrease.amount === 0) {
            tempList = tempList.filter((product) => product.added !== action.payload.productID)
        }
        return { ...state, total: state.total - toDecrease.price, productsInList: tempList }
    }
    else if (action.type === "LOW_TO_HIGH") {
        const sorted = sortItems(state.products, "price", 1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if (action.type === "HIGH_TO_LOW") {
        const sorted = sortItems(state.products, "price", -1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if (action.type === "NEW_TO_OLD") {
        const sorted = sortItems(state.products, "added", 1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if (action.type === "OLD_TO_NEW") {
        const sorted = sortItems(state.products, "added", -1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if(action.type === "CHANGE_CHECKED_BRANDFILTER"){
        const companyID = action.payload.id
        const obj = state.companies.find((company)=> company.account === companyID)
        obj.isChecked = !obj.isChecked
        var newProducts = []
        let comps = state.companies
        let allprs = state.allProducts
        for(let i = 0; i < comps.length; i++){
            for(let j = 0; j < allprs.length; j++){
                if(comps[i].isChecked){
                    if(allprs[j].manufacturer === comps[i].slug){
                        newProducts.push(allprs[j])
                    }
                }   
            }
        }
        if(newProducts.length === 0){
            newProducts = state.allProducts
        }
        const {mugs, shirts} = splitMugAndShirt(newProducts)
        return {...state, products:newProducts, mugProducts: mugs, shirtProducts: shirts}
    }
    else if(action.type === "CHANGE_CHECKED_TAGFILTER"){
        const tagName = action.payload.tagName
        const obj = state.tags.find((tag)=> tag.tagName === tagName)
        obj.isChecked = !obj.isChecked
        var newProducts2 = []
        let tags = state.tags
        let allprs = state.allProducts
        for(let i = 0; i < tags.length; i++){
            for(let j = 0; j < allprs.length; j++){
                for(let k = 0; k < allprs[j].tags.length; k++ ){
                    if(tags[i].isChecked){
                        if(allprs[j].tags[k] === tags[i].tagName){
                            newProducts2.push(allprs[j])
                        }
                    }
                }
            }
        }
        if(newProducts2.length === 0){
            newProducts2 = state.allProducts
        }
        const {mugs, shirts} = splitMugAndShirt(newProducts2)
        return {...state, products:newProducts2, mugProducts: mugs, shirtProducts: shirts}
    }
    return state;
}

export default reducer
