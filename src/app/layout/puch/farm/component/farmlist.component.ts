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
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';
import {BrandService} from "../../../../shared/services/prod/brand.service";
import {CategoryService} from '../../../../shared/services/prod/category.service';
import {ProductService} from "../../../../shared/services/prod/product.service";
import {ConstCodeService} from "../../../../shared/services/common/constCode.service";
import {FarmPurchaseService} from "../../../../shared/services/puch/farmPurchase.service";

@Component({
    selector: 'app-puch-farmlist',
    templateUrl: './farmlist.component.html',
    animations: [routerTransition()]
})
export class FarmPurchaseListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {billType:'','billCode':'','name':'','supplyCorpName':'','status':'','startDate':'','endDate':''};

    public listBillType = [];

    public listBrand = [];

    public corpId='';

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private constCodeService: ConstCodeService,private farmPurchaseService:FarmPurchaseService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corpId = this.authService.getCorpInfoId();

        this.loadData();
    }

    loadData() {

        let params = new HttpParams().set('constCode', 'pt_puch_type');

        this.constCodeService.findItemAllByCode(params).subscribe(res=>{
            if(res.code == 0){
                this.listBillType = res.data;
            }
        });



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

        const params = new HttpParams().set('billCode', this.searchData.billCode).set('billType',this.searchData.billType).set('name',this.searchData.name).set('supplyCorpName',this.searchData.supplyCorpName).set('status',this.searchData.status)
            .set('startDate',this.searchData.startDate).set('endDate',this.searchData.endDate).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.farmPurchaseService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }

    checkItem(item:any){

    }

    toView(id){
        this.router.navigate(['/puch/farm/farmview', { 'id': id}]);
    }

    toEdit(id){
        this.router.navigate(['/puch/farm/farmedit', { 'id': id}]);
    }


}
