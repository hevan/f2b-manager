/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {CorpService} from '../../../../shared/services/corp/corp.service';
import { Keys   }    from '../../../../shared/common/keys';
import {ProductService} from "../../../../shared/services/prod/product.service";
import {ProductSkuService} from "../../../../shared/services/prod/productSku.service";
import {ProductMediaService} from "../../../../shared/services/prod/productMedia.service";
import {ProductWholesaleService} from "../../../../shared/services/prod/productWholesale.service";

@Component({
    selector: 'app-prod-productview',
    templateUrl: './productview.component.html',
    animations: [routerTransition()]
})
export class ProductViewComponent implements OnInit {


    public curId;//当前数据ID
    public productData:any;
    public listSku = [];
    public listMedia = [];
    public listWholesale = [];

    public showFiles = false;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private productService: ProductService,private productSkuService: ProductSkuService,private productMediaService: ProductMediaService,private productWholesaleService: ProductWholesaleService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();

        this.loadSku();
        this.loadMedia();

        this.loadWholesale();
    }

    loadData(){
        if(this.curId){
            this.productService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.productData = res.data;
                }

            });
        }
    }

    loadMedia(){
        let paramsMedia = new HttpParams().set('productId',this.curId);

        this.productMediaService.findAllByProductId(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listMedia = res.data;
            }
        });
    }

    toDeleteMedia(id){
        this.productMediaService.delete(id).subscribe(res=>{
            if(res.code == 0){
                this.loadMedia();
            }

        });
    }

    loadSku(){
        let paramsSku = new HttpParams().set('productId',this.curId);

        this.productSkuService.findAllByProductId(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listSku = res.data;
            }
        });
    }

    addSku(){
        let productSku = {id:'',sku:'',prodId:this.curId,price:0.00,marketPrice:0.00,stock:0};
        this.listSku.push(productSku);
    }

    saveSku(){
        this.productSkuService.saveList(JSON.stringify(this.listSku)).subscribe(res=>{
            if(res.code == 0){
                this.loadSku();
            }
        });
    }

    toDeleteSku(index){
        this.listSku.splice(index,1);
    }

    loadWholesale(){
        let paramsSku = new HttpParams().set('productId',this.curId);

        this.productWholesaleService.findAllByProductId(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listSku = res.data;
            }
        });
    }

    addWholesale(){
        let productWholesale = {id:'',prodId:this.curId,price:0.00,startCount:100,endCount:200};
        this.listWholesale.push(productWholesale);
    }

    saveWholesale(){
        this.productWholesaleService.saveList(JSON.stringify(this.listWholesale)).subscribe(res=>{
            if(res.code == 0){
                this.loadWholesale();
            }
        });
    }

    toDeleteWholesale(index){
        this.listWholesale.splice(index,1);
    }

    //编辑
    toEdit(){
        this.router.navigate(['/prod/product/productedit',{id:this.curId}]);
    }

    toUpdateStatus(status){
        let paramsMedia = new HttpParams().set('id',this.curId).set('status', status);

        this.productService.updateStatus(paramsMedia).subscribe(res=>{
            if(res.code == 0){

            }
        });
    }

    onBasicUploadAutoEx(event){

        let imageUrl = JSON.parse(event.xhr.response).data.imageUrl;

        let productMedia = {id:'', productId:this.curId,'imageUrl':imageUrl,'sortNum':1};
        this.productMediaService.save(JSON.stringify(productMedia)).subscribe(res=>{
            if(res.code == 0){
                productMedia.id = res.data;
                this.loadMedia();
            }

        });
    }


    goBack(){
        this.location.back();
    }
}
