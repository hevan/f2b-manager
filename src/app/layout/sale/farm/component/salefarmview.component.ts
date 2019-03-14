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
import {FarmPurchaseService} from "../../../../shared/services/puch/farmPurchase.service";
import {FarmPurchaseItemService} from "../../../../shared/services/puch/farmPurchaseItem.service";

@Component({
    selector: 'app-puch-salefarmview',
    templateUrl: './salefarmview.component.html',
    animations: [routerTransition()]
})
export class SaleFarmPurchaseViewComponent implements OnInit {


    public curId;//当前数据ID
    public purchaseData:any;

    public listItem = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private farmPurchaseService: FarmPurchaseService,private farmPurchaseItemService: FarmPurchaseItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.farmPurchaseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.purchaseData = res.data;
                }

            });

            this.loadPurchItem();
        }
    }

    loadPurchItem(){
        let paramsMedia = new HttpParams().set('purchaseId',this.curId);

        this.farmPurchaseItemService.findAllByPurchaseId(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listItem = res.data;
            }
        });
    }
    //编辑
    toEdit(){
        this.router.navigate(['/sale/salefarm/salefarmedit',{id:this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
