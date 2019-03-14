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

@Component({
    selector: 'app-puch-recvtransitedit',
    templateUrl: './recvtransitedit.component.html',
    animations: [routerTransition()]
})
export class RecvTransitBillEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corpId;

    submitted = false; //控制重复提交

    public listBillType = [];

    public listItem = [];

    public listProductSku = [];

    public listPurchaseItemUpdate = [];

    public curSelectProduct:any;

    public displayEdit =false;

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private purchaseService: PurchaseService,private constCodeService:ConstCodeService,private purchaseItemService:PurchaseItemService,private productSkuService:ProductSkuService,private productService:ProductService,private authService:AuthService,private constService:ConstService, private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corpId = this.authService.getCorpInfoId();

        let params = new HttpParams().set('code', 'pt_trans_bill');

        this.constCodeService.findItemAllByCode(params).subscribe(res=>{
            if(res.code == 0){
                this.listBillType = res.data;
            }
        });


        if(this.curId){
            this.purchaseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'billCode': res.data.billCode});

                    this.dataForm.patchValue({'billType': res.data.billType});
                    this.dataForm.patchValue({'supplyCorpId': res.data.supplyCorpId});
                    this.dataForm.patchValue({'supplyCorpName': res.data.supplyCorpName});

                    this.dataForm.patchValue({'purchLinkMan': res.data.purchLinkMan});
                    this.dataForm.patchValue({'purchLinkTel': res.data.purchLinkTel});
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
            supplyCorpId: new FormControl('', Validators.required),
            supplyCorpName: new FormControl('', Validators.required),
            purchLinkMan: new FormControl('', Validators.required),
            purchLinkTel: new FormControl('', Validators.required)
        });
    }

    loadPurchItem(){
        let paramsMedia = new HttpParams().set('purchaseId',this.curId);

        this.purchaseItemService.findAllByPurchaseId(paramsMedia).subscribe(res=>{
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
        formData.purchCorpId = this.corpId;


        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.purchaseService.save(JSON.stringify(formData)).subscribe(res=>{
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

    loadProductSku(id){
        let paramsMedia = new HttpParams().set('productId',id).set('purchaseId',this.curId);

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

        this.purchaseItemService.saveList(JSON.stringify(this.listPurchaseItemUpdate)).subscribe(res=>{
            if(res.code == 0){
                this.loadPurchItem();
                this.displayEdit = false;

                this.curSelectProduct = null;
                this.listPurchaseItemUpdate = [];
            }
        });
    }

    genBillCode(){

        this.constService.genBillNo('P').subscribe(res=>{
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
