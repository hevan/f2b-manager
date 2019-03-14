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
import { PageDataModel  }    from '../../../../shared/common/page.model';

import {GroupDistributService} from "../../../../shared/services/corp/groupDistribut.service";

import {ProductOrderService} from "../../../../shared/services/finance/productOrder.service";

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-tuan-distribut-view',
    templateUrl: './distributview.component.html',
    animations: [routerTransition()]
})
export class TuanDistributViewComponent implements OnInit {


    public curId;//当前数据ID
    public tuanData:any;

    public listSaleProduct = [];

    public pageNav = new PageDataModel();

    public listData = [];

    public submitted = false;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private toastrService:ToastrService,private groupDistributService: GroupDistributService,private productOrderService:ProductOrderService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();
    }

    loadData(){
        if(this.curId){
            this.groupDistributService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.tuanData = res.data;

                    this.paginateQuery(null);

                    this.loadSaleProduct();
                }

            });
        }
    }

    paginateQuery(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages

        let curPage;
        if(null == event){
            curPage = this.pageNav.page +'';
        }else{
            curPage = event.page;
        }

        const params = new HttpParams().set('groupDistributId', this.curId).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.productOrderService.pageQueryEx(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }

        });
    }


    loadSaleProduct() {
        const params = new HttpParams().set('groupDistributId', this.curId);

        this.productOrderService.findTuanAllProduct(params).subscribe(res=>{
            if(res.code == 0){
                this.listSaleProduct = res.data;

            }

        });
    }



    goBack(){
        this.location.back();
    }
}
