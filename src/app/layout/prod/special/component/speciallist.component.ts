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
import {SpecialProductService} from "../../../../shared/services/prod/specialProduct.service";

@Component({
    selector: 'app-prod-speciallist',
    templateUrl: './speciallist.component.html',
    animations: [routerTransition()]
})
export class SpecialProductListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {category:{id:''},'code':'','name':''};

    public listCategory = [];

    public corpId='';

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private specialProductService:SpecialProductService,private categoryService: CategoryService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corpId = this.authService.getCorpInfoId();

        this.loadData();
    }

    loadData() {

        this.categoryService.findAll().subscribe(res=>{
            if(res.code == 0){
                this.listCategory = res.data;
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

        const params = new HttpParams().set('category.id', this.searchData.category.id).set('corpId', this.corpId).set('name',this.searchData.name).set('code',this.searchData.code).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.specialProductService.pageQuery(params).subscribe(res=>{
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
        this.router.navigate(['/prod/special/specialview', { 'id': id}]);
    }

    toEdit(id){
        this.router.navigate(['/prod/special/specialedit', { 'id': id}]);
    }

    goBack(){
        this.location.back();
    }
}
