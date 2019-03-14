/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit,Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';

import {TransitOrderService} from "../../../../shared/services/finance/transitOrder.service";
import {WarehouseService} from "../../../../shared/services/wms/warehouse.service";

@Component({
    selector: 'app-order-trans-status',
    templateUrl: './transorderstatus.component.html'
})
export class TransOrderStatusComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {warehouseId:'',orderNo:'',transOrderNo:'','userMobile':'','status':'3','startDate':'','endDate':''};

    @Input()
    public status;

    public listWarehouse = [];

    public submitted =false;
    public corp;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private transitOrderService:TransitOrderService,private warehouseService:WarehouseService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

        this.searchData.status = this.status;
        //this.loadData();

        const paramsContract = new HttpParams().set('corpId', this.corp.id).set('page','0').set('itemsPerPage',this.pageNav.itemsPerPage+'');
        this.warehouseService.pageQuery(paramsContract).subscribe(res=>{
            if(res.code == 0){
                this.listWarehouse = res.data;

            }
        });

        this.loadData();
    }

    loadData() {
        this.paginateQuery(null);
    }

    paginateQuery(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
        this.submitted = true;
        let curPage;
        if(null == event){
            curPage = this.pageNav.page +'';
        }else{
            curPage = event.page;
        }

        const params = new HttpParams().set('warehouseId', this.searchData.warehouseId).set('userMobile', this.searchData.userMobile).set('corpId',this.corp.id).set('status',this.searchData.status)
            .set('orderNo', this.searchData.orderNo).set('transOrderNo', this.searchData.transOrderNo)
            .set('startDate',this.searchData.startDate).set('endDate',this.searchData.endDate).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.transitOrderService.pageQueryEx(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
            this.submitted = false;
        });
    }

    toView(id){
        this.router.navigate(['/order/trans/transview', { 'id': id}]);
    }



}
