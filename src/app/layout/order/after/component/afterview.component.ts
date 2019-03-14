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

import {AfterSaleService} from "../../../../shared/services/finance/afterSale.service";

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-after-afterview',
    templateUrl: './afterview.component.html',
    animations: [routerTransition()]
})
export class AfterViewComponent implements OnInit {

    public curId;//当前数据ID
    public orderData:any;

    public listItem = [];

    public refundAmount='';

    public displayEdit = false;

    public submitted = false;

    public corp;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private toastrService:ToastrService,private afterSaleService: AfterSaleService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.afterSaleService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.orderData = res.data;
                }

            });
        }
    }

    toCheck(status){
        let paramsMedia = new HttpParams().set('id',this.curId).set('status', status);
        this.afterSaleService.updateStatus(paramsMedia).subscribe(res=>{
            if(res.code == 0){

                this.orderData.status = status;
            }

        });


    }

    toRefund(status){
        this.submitted = true;
        let paramsMedia = new HttpParams().set('id',this.curId).set('appId', this.corp.appId);
        this.afterSaleService.refund(paramsMedia).subscribe(res=>{
            if(res.code == 0){

                if(res.data == 1){
                    this.toastrService.success("退款成功，已处理");
                }else{
                    this.toastrService.error("退款失败");
                }

                this.submitted = false;
            }
        });
    }

    toSet()
    {
        this.displayEdit = true;
    }

    toSetSave(){

        if(this.refundAmount.length > 0){
            this.orderData.refundAmount = this.refundAmount;
            this.afterSaleService.save(JSON.stringify(this.orderData)).subscribe(res=>{
                if(res.code == 0){
                    this.toastrService.success("修改成功");
                }else {
                    this.toastrService.error("修改失败");
                }

                this.displayEdit = false;
            });
        }
    }

    toDelete(){

        this.afterSaleService.delete(this.curId).subscribe(res=>{
            if(res.code == 0){
                this.toastrService.success("删除成功");
            }else {
                this.toastrService.error("删除失败");
            }
        });

    }
    goBack(){
        this.location.back();
    }
}
