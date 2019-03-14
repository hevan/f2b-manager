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
import {TransitOrderService} from "../../../../shared/services/finance/transitOrder.service";
import {WarehouseService} from "../../../../shared/services/wms/warehouse.service";

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-trans-view',
    templateUrl: './transorderview.component.html',
    animations: [routerTransition()]
})
export class TransOrderViewComponent implements OnInit {


    public curId;//当前数据ID
    public orderData:any;
    public warehouseData:any;
    public displayEdit = false;
    public transOrderNo='';
    public transCorpName='';

    public listItem = [];

    public submitted = false;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private toastrService:ToastrService,private transitOrderService: TransitOrderService,private warehouseService:WarehouseService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.transitOrderService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.orderData = res.data;

                    this.loadWarehouse(this.orderData.warehouseId);
                }

            });
        }
    }

    loadWarehouse(wId){
        this.warehouseService.find(wId).subscribe(res=>{
            if(res.code == 0){
                this.warehouseData = res.data;
            }
        });
    }

    onSend(){
        this.submitted = true;
        if(this.transOrderNo.length > 0){

            this.orderData.transOrderNo = this.transOrderNo;
            this.orderData.transCorpName = this.transCorpName;

            this.orderData.status =2;

            this.transitOrderService.save(JSON.stringify(this.orderData)).subscribe(res=>{
                if(res.code == 0){

                    this.submitted = false;
                    this.displayEdit = false;
                }

            });
        }
    }

    toCopy(){

        if(this.orderData.transOrderNo.length > 0){

            let copyOrderData = this.orderData;
            copyOrderData.id = '';
            copyOrderData.transOrderNo = '';
            copyOrderData.transCorpName = '';

            copyOrderData.status =1;

            this.transitOrderService.save(JSON.stringify(copyOrderData)).subscribe(res=>{
                if(res.code == 0){

                    this.router.navigate(['/order/trans/transview', { 'id': res.data}]);
                }

            });
        }
    }

    toOpenSend(){
        this.displayEdit = true;
    }

    toDelete(){

        this.transitOrderService.delete(this.curId).subscribe(res=>{
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
