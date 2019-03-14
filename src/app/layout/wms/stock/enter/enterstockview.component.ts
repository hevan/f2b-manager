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
import {EnterStockService} from "../../../../shared/services/wms/enterStock.service";
import {EnterStockItemService} from "../../../../shared/services/wms/enterStockItem.service";

@Component({
    selector: 'app-stock-enterstockview',
    templateUrl: './enterstockview.component.html',
    animations: [routerTransition()]
})
export class EnterStockViewComponent implements OnInit {


    public curId;//当前数据ID
    public enterStockData:any;

    public listItem = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private enterStockService: EnterStockService,private enterStockItemService: EnterStockItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.enterStockService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.enterStockData = res.data;
                }

            });

            this.loadPurchItem();
        }
    }

    loadPurchItem(){
        let paramsMedia = new HttpParams().set('enterStockId',this.curId);

        this.enterStockItemService.findAllByEnterStockId(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listItem = res.data;
            }
        });
    }
    //编辑
    toEdit(){
        this.router.navigate(['/wms/stock/enterstockedit',{id:this.curId}]);
    }

    toUpdateStatus(status){
        let paramsMedia = new HttpParams().set('id',this.curId).set('status', status);

        this.enterStockService.updateStatus(paramsMedia).subscribe(res=>{
            if(res.code == 0){

            }
        });
    }

    goBack(){
        this.location.back();
    }
}
