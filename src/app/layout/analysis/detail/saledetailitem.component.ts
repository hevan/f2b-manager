/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit,Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../shared/services/user/auth.service';
import { Keys  }    from '../../../shared/common/keys';
import { PageDataModel  }    from '../../../shared/common/page.model';

import {ProductOrderItemService} from "../../../shared/services/finance/productOrderItem.service";



@Component({
    selector: 'app-analysis-product-order-item',
    templateUrl: './saledetailitem.component.html'
})
export class SaleDetailItemComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {prodCode:'','startDate':'','endDate':''};

    public submitted =false;

    public corp;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private productOrderItemService:ProductOrderItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

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

        const params = new HttpParams().set('corpId', this.corp.id).set('prodCode', this.searchData.prodCode)
            .set('startDate',this.searchData.startDate).set('endDate',this.searchData.endDate).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.productOrderItemService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
            this.submitted = false;
        });
    }

    toView(id){
        this.router.navigate(['/order/buy/orderview', { 'id': id}]);
    }


}
