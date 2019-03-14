/**
 * Created by hevan on 2018/7/7.
 */

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';

import {ProductService} from "../../../../shared/services/prod/product.service";
import {StockService} from "../../../../shared/services/wms/stock.service";


@Component({
    selector: 'app-stock-productstock',
    templateUrl: './productstock.component.html',
    animations: [routerTransition()]
})
export class ProductStockComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {'prodName':'','prodCode':''};


    public listItem;

    public corpId='';

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private stockService:StockService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corpId = this.authService.getCorpInfoId();

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
        let curPage;
        if(null == event){
            curPage = this.pageNav.page +'';
        }else{
            curPage = event.page;
        }

        const params = new HttpParams().set('prodName', this.searchData.prodName).set('prodCode',this.searchData.prodCode).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.stockService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }

    checkItem(item:any){

    }

    toViewDetail(id){
        this.router.navigate(['/wms/stock/productstock', { 'id': id}]);
    }


}
