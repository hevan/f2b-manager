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
import {CorpProductOrderService} from "../../../../shared/services/finance/corpProductOrder.service";

@Component({
    selector: 'app-order-orderview',
    templateUrl: './orderview.component.html',
    animations: [routerTransition()]
})
export class OrderViewComponent implements OnInit {


    public curId;//当前数据ID
    public orderData:any;

    public listItem = [];

    public submitted = false;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private corpProductOrderService: CorpProductOrderService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.corpProductOrderService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.orderData = res.data;
                }

            });
        }
    }

    toTrans(){
        this.submitted = true;
        const params = new HttpParams().set('corpOrderId', this.curId);
        this.corpProductOrderService.genTrans(params).subscribe(res=>{
            if(res.code == 0){

                this.submitted = false;
            }

        });
    }

    goBack(){
        this.location.back();
    }
}
