/**
 * Created by hevan on 2018/6/4.
 */
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
import {PurchaseService} from "../../../../shared/services/puch/purchase.service";
import {PurchaseItemService} from "../../../../shared/services/puch/purchaseItem.service";

@Component({
    selector: 'app-puch-recvtransitview',
    templateUrl: './recvtransitview.component.html',
    animations: [routerTransition()]
})
export class RecvTransitBillViewComponent implements OnInit {


    public curId;//当前数据ID
    public purchaseData:any;

    public listItem = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private purchaseService: PurchaseService,private purchaseItemService: PurchaseItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.purchaseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.purchaseData = res.data;
                }

            });

            this.loadPurchItem();
        }
    }

    loadPurchItem(){
        let paramsMedia = new HttpParams().set('purchaseId',this.curId);

        this.purchaseItemService.findAll(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listItem = res.data;
            }
        });
    }
    //编辑
    toEdit(){
        this.router.navigate(['/puch/purchase/purchaseedit',{id:this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
