export default class PurchaseDetail {
    constructor(purchase = {
        projectName : "",
        unitPrice: "",
        quantityPerUnit: "",
        unitsInStock:"",
        
    }) {
        this.projectName = purchase.projectName;
        this.unitPrice = purchase.unitPrice;
        this.quantityPerUnit = purchase.quantityPerUnit;
        this.unitsInStock = purchase.unitsInStock;
    }
};