/**
 * Created by hevan on 2018/6/4.
 */
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys   }    from '../../../../shared/common/keys';
import {PurchaseService} from "../../../../shared/services/puch/purchase.service";
import {PurchaseItemService} from "../../../../shared/services/puch/purchaseItem.service";
import {ConstItemService} from "../../../../shared/services/common/constItem.service";
import {ConstCodeService} from "../../../../shared/services/common/constCode.service";

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CorpSelectComponent} from "../../../merch/corp/component/corpselect.component";
import {ProductSelectComponent} from "../../../prod/product/component/productselect.component";
import {ProductSkuService} from "../../../../shared/services/prod/productSku.service";
import {ConstService} from "../../../../shared/services/common/const.service";
import {ProductService} from "../../../../shared/services/prod/product.service";
import {TransitBillService} from "../../../../shared/services/puch/transitBill.service";
import {TransitBillItemService} from "../../../../shared/services/puch/transitBillItem.service";
import {CityService} from "../../../../shared/services/common/city.service";
import {PurchaseSelectComponent} from "../../../puch/purchase/component/purchaseselect.component";
import {FarmSelectComponent} from "../../farm/component/farmselect.component";

@Component({
    selector: 'app-puch-transitedit',
    templateUrl: './transitedit.component.html',
    animations: [routerTransition()]
})
export class TransitBillEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corp;

    submitted = false; //控制重复提交

    public listBillType = [];

    public listItem = [];

    public listProductSku = [];

    public listPurchaseItemUpdate = [];

    public curSelectProduct:any;

    public displayEdit =false;

    public listProvince = [];

    public listCity = [];

    public listRegion = [];

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private transitBillService: TransitBillService,private constCodeService:ConstCodeService,private transitBillItemService:TransitBillItemService,private productSkuService:ProductSkuService,private cityService:CityService,private productService:ProductService,private authService:AuthService,private constService:ConstService, private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();

        this.cityService.findAllRegion().subscribe(res=>{
            if(res.code == 0){
                this.listProvince = res.data;
            }
        });


        let params = new HttpParams().set('code', 'pt_trans_bill');

        this.constCodeService.findItemAllByCode(params).subscribe(res=>{
            if(res.code == 0){
                this.listBillType = res.data;
            }
        });


        if(this.curId){
            this.transitBillService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'billCode': res.data.billCode});
                    this.dataForm.patchValue({'billType': res.data.billType});

                    this.dataForm.patchValue({'purchCorpId': res.data.purchCorpId});
                    this.dataForm.patchValue({'purchCorpName': res.data.purchCorpName});
                    this.dataForm.patchValue({'purchLinkMan': res.data.purchLinkMan});
                    this.dataForm.patchValue({'purchLinkTel': res.data.purchLinkTel});

                    this.dataForm.patchValue({'province': res.data.province});
                    this.dataForm.patchValue({'city': res.data.city});
                    this.dataForm.patchValue({'region': res.data.region});
                    this.dataForm.patchValue({'address': res.data.address});


                    this.dataForm.patchValue({'supplyLinkMan': res.data.supplyLinkMan});
                    this.dataForm.patchValue({'supplyLinkTel': res.data.supplyLinkTel});
                }

            });

            this.loadPurchItem();

        }

        this.dataForm.controls['province'].valueChanges
            .subscribe(term => {
                for(var i=0;i<this.listProvince.length;i++){

                    if(term === this.listProvince[i].name){
                        this.listCity = this.listProvince[i].subRegions;
                    }
                }
            });


        this.dataForm.controls['city'].valueChanges
            .subscribe(term => {
                for(var i=0;i<this.listCity.length;i++){

                    if(term === this.listCity[i].name){
                        this.listRegion = this.listCity[i].subRegions;
                    }
                }
            });
    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            billCode: new FormControl('', Validators.required),
            billType: new FormControl('',Validators.required),
            originBillCode: new FormControl('', Validators.required),
            originBillType: new FormControl('',Validators.required),
            purchCorpId: new FormControl('', Validators.required),
            purchCorpName: new FormControl('', Validators.required),
            purchLinkMan: new FormControl('', Validators.required),
            purchLinkTel: new FormControl('', Validators.required),
            supplyLinkMan: new FormControl('', Validators.required),
            supplyLinkTel: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            region: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required)
        });


    }

    loadPurchItem(){
        let paramsMedia = new HttpParams().set('transitBillId',this.curId);

        this.transitBillItemService.findAllByTransBillId(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listItem = res.data;
            }
        });
    }


    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;
        formData.supplyCorpId = this.corp.id;
        formData.supplyCorpName = this.corp.name;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.transitBillService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;
            }
            //还原button
            this.submitted = false;
        });
    }

    selectCorp(){
        const modalRef = this.modalService.open(CorpSelectComponent);
        modalRef.result.then((result) => {
           let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'purchCorpId': retData.id});
            this.dataForm.patchValue({'purchCorpName': retData.name});


        }, (reason) => {
        });
    }

    selectProduct(){
        const modalRef = this.modalService.open(ProductSelectComponent);
        modalRef.result.then((result) => {
            this.curSelectProduct = JSON.parse(result);

            if(this.curSelectProduct){
                this.displayEdit = true;
                this.loadProductSku(this.curSelectProduct.id)
            }

        }, (reason) => {
        });
    }

    selectPurchase(){
        const modalRef = this.modalService.open(PurchaseSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'purchCorpId': retData.purchCorpId});
            this.dataForm.patchValue({'purchCorpName': retData.purchCorpName});
            this.dataForm.patchValue({'purchLinkMan': retData.purchLinkMan});
            this.dataForm.patchValue({'purchLinkTel': retData.purchLinkTel});
            this.dataForm.patchValue({'originBillCode': retData.billCode});
            this.dataForm.patchValue({'originBillType': retData.billType});

        }, (reason) => {
        });
    }

    selectFarm(){
        const modalRef = this.modalService.open(FarmSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'purchCorpId': retData.purchCorpId});
            this.dataForm.patchValue({'purchCorpName': retData.purchCorpName});
            this.dataForm.patchValue({'purchLinkMan': retData.purchLinkMan});
            this.dataForm.patchValue({'purchLinkTel': retData.purchLinkTel});
            this.dataForm.patchValue({'originBillCode': retData.billCode});
            this.dataForm.patchValue({'originBillType': retData.billType});

        }, (reason) => {
        });
    }

    loadProductSku(id){
        let paramsMedia = new HttpParams().set('productId',id);

        this.productSkuService.findAllByProductId(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listProductSku = res.data;

                if(this.listProductSku && this.listProductSku.length >0){

                    for(var m=0;m<this.listProductSku.length;m++){
                        let curSku = this.listProductSku[m];
                        let purchaseItem = {id:'',transitBillId:this.curId,'prodId':this.curSelectProduct.id,'prodCode':this.curSelectProduct.code,'prodName':this.curSelectProduct.name,
                            'prodSpec':this.curSelectProduct.prodSpec, 'prodImageUrl':this.curSelectProduct.imageUrl,'skuId':curSku.id,'sku':curSku.sku,'prodCategory':this.curSelectProduct.category.name,'calcUnit':this.curSelectProduct.calcUnit,'price':curSku.price,'qty':0,'description':''};

                        if(this.listItem.length > 0){
                            for(var n=0;n<this.listItem.length;n++){
                               let  curPurchaseItemT = this.listItem[n];
                                if(curSku.prodId == curPurchaseItemT.prodId && curSku.id == curPurchaseItemT.skuId){
                                    purchaseItem.id = curPurchaseItemT.id;
                                    purchaseItem.qty = curPurchaseItemT.qty;
                                    purchaseItem.description = curPurchaseItemT.description;
                                }
                            }
                        }

                        this.listPurchaseItemUpdate.push(purchaseItem);
                    }

                }else{
                    let purchaseItem = {id:'',transitBillId:this.curId,'prodId':id,'prodCode':this.curSelectProduct.code,'prodName':this.curSelectProduct.name,
                        'prodSpec':this.curSelectProduct.prodSpec, 'prodImageUrl':this.curSelectProduct.imageUrl,'skuId':'','sku':'','prodCategory':this.curSelectProduct.category.name,'calcUnit':this.curSelectProduct.calcUnit,'price':this.curSelectProduct.price,'qty':0,'description':''};

                    if(this.listItem.length > 0){
                        for(var n=0;n<this.listItem.length;n++){
                            let  curPurchaseItemT = this.listItem[n];
                            if(purchaseItem.prodId == curPurchaseItemT.prodId){
                                purchaseItem.id = curPurchaseItemT.id;
                                purchaseItem.qty = curPurchaseItemT.qty;
                                purchaseItem.description = curPurchaseItemT.description;
                            }
                        }
                    }


                    this.listPurchaseItemUpdate.push(purchaseItem);
                }
            }
        });
    }

    saveProductItem(){

        this.transitBillItemService.saveList(JSON.stringify(this.listPurchaseItemUpdate)).subscribe(res=>{
            if(res.code == 0){
                this.loadPurchItem();
                this.displayEdit = false;

                this.curSelectProduct = null;
                this.listPurchaseItemUpdate = [];
            }
        });
    }

    genBillCode(){

        this.constService.genBillNo('T').subscribe(res=>{
           if(res.code ===0 ){
               this.dataForm.patchValue({'billCode': res.data});
           }
        });
    }

    toEditItem(item){


        this.productService.find(item.prodId).subscribe(res=>{
            if(res.code == 0){
                this.curSelectProduct = res.data;

                this.loadProductSku(item.prodId);

                this.displayEdit = true;
            }
        });

    }
    cancelEdit(){
        this.curSelectProduct = null;
        this.listPurchaseItemUpdate = [];
        this.displayEdit = false;
    }

    goBack(){
        this.location.back();
    }

}
