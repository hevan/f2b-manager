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
import {FarmPurchaseService} from "../../../../shared/services/puch/farmPurchase.service";
import {FarmPurchaseItemService} from "../../../../shared/services/puch/farmPurchaseItem.service";
import {ConstItemService} from "../../../../shared/services/common/constItem.service";
import {ConstCodeService} from "../../../../shared/services/common/constCode.service";

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CorpSelectComponent} from "../../../merch/corp/component/corpselect.component";
import {ProductSelectComponent} from "../../../prod/product/component/productselect.component";
import {ProductSkuService} from "../../../../shared/services/prod/productSku.service";
import {ConstService} from "../../../../shared/services/common/const.service";
import {ProductService} from "../../../../shared/services/prod/product.service";
import {PurchaseSelectModule} from "../../../puch/purchase/component/purchaseselect.module";
import {PurchaseSelectComponent} from "../../../puch/purchase/component/purchaseselect.component";

@Component({
    selector: 'app-puch-salefarmedit',
    templateUrl: './salefarmedit.component.html',
    animations: [routerTransition()]
})
export class SaleFarmPurchaseEditComponent implements OnInit {

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

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private farmPurchaseService: FarmPurchaseService,private constCodeService:ConstCodeService,private farmPurchaseItemService:FarmPurchaseItemService,private productSkuService:ProductSkuService,private productService:ProductService,private authService:AuthService,private constService:ConstService, private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();

        let params = new HttpParams().set('code', 'pt_farm_type');

        this.constCodeService.findItemAllByCode(params).subscribe(res=>{
            if(res.code == 0){
                this.listBillType = res.data;
            }
        });

        if(this.curId){
            this.farmPurchaseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'billCode': res.data.billCode});

                    this.dataForm.patchValue({'billType': res.data.billType});
                    this.dataForm.patchValue({'purchCorpId': res.data.purchCorpId});
                    this.dataForm.patchValue({'purchCorpName': res.data.purchCorpName});

                    this.dataForm.patchValue({'originBillCode': res.data.originBillCode});
                    this.dataForm.patchValue({'originBillType': res.data.originBillType});

                    this.dataForm.patchValue({'supplyLinkMan': res.data.supplyLinkMan});
                    this.dataForm.patchValue({'supplyLinkTel': res.data.supplyLinkTel});
                }

            });

            this.loadPurchItem();

        }

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
            supplyLinkMan: new FormControl('', Validators.required),
            supplyLinkTel: new FormControl('', Validators.required)
        });


    }

    loadPurchItem(){
        let paramsMedia = new HttpParams().set('purchaseId',this.curId);

        this.farmPurchaseItemService.findAllByPurchaseId(paramsMedia).subscribe(res=>{
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

        this.farmPurchaseService.save(JSON.stringify(formData)).subscribe(res=>{
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
            this.dataForm.patchValue({'supplyCorpId': retData.id});
            this.dataForm.patchValue({'supplyCorpName': retData.name});

        }, (reason) => {
        });
    }

    selectPurchase(){
        const modalRef = this.modalService.open(PurchaseSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'purchCorpId': retData.supplyCorpId});
            this.dataForm.patchValue({'purchCorpName': retData.supplyCorpName});
            this.dataForm.patchValue({'originBillCode': retData.billCode});
            this.dataForm.patchValue({'originBillType': retData.billType});

        }, (reason) => {
        });
    }

    selectProduct(){
        const modalRef = this.modalService.open(ProductSelectComponent);
        modalRef.result.then((result) => {
            this.curSelectProduct = JSON.parse(result);

            if(this.curSelectProduct){
                this.displayEdit = true;
                this.loadProductSku(this.curSelectProduct.id);
            }

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
                        let purchaseItem = {id:'',purchaseId:this.curId,'prodId':this.curSelectProduct.id,'prodCode':this.curSelectProduct.code,'prodName':this.curSelectProduct.name,
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
                    let purchaseItem = {id:'',purchaseId:this.curId,'prodId':id,'prodCode':this.curSelectProduct.code,'prodName':this.curSelectProduct.name,
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

        this.farmPurchaseItemService.saveList(JSON.stringify(this.listPurchaseItemUpdate)).subscribe(res=>{
            if(res.code == 0){
                this.loadPurchItem();
                this.displayEdit = false;

                this.curSelectProduct = null;
                this.listPurchaseItemUpdate = [];
            }
        });
    }

    genBillCode(){

        this.constService.genBillNo('F').subscribe(res=>{
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
