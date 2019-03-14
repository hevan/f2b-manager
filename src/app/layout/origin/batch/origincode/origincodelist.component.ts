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
import {BatchCodeService} from "../../../../shared/services/origin/batchCode.service";
import {CommodityCodeService} from "../../../../shared/services/origin/commodityCode.service";
import {OriginCodeService} from "../../../../shared/services/origin/originCode.service";


@Component({
    selector: 'app-origin-origincodelist',
    templateUrl: './origincodelist.component.html',
    animations: [routerTransition()]
})
export class OriginCodeListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {'batchCodeId':''};

    public corp;



    public listBatch = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location,private batchCodeService:BatchCodeService, private route: ActivatedRoute,private router: Router,private originCodeService:OriginCodeService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {

        this.searchData.batchCodeId = this.route.snapshot.paramMap.get('batchCodeId');

        this.corp = this.authService.getCorpInfo();

        this.paginateBatch();

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

        if(!this.searchData.batchCodeId || this.searchData.batchCodeId == ''){
            return;
        }

        const params = new HttpParams().set('batchCodeId', this.searchData.batchCodeId).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.originCodeService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }


    paginateBatch() {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
        let curPage = '0';


        const params = new HttpParams().set('corpId',this.corp.id).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.batchCodeService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listBatch = res.data;
            }
        });
    }

    toView(id){
        this.router.navigate(['/origin/batch/origincodeview', { 'id': id}]);
    }

    //编辑
    toGen(){

        if(this.searchData.batchCodeId.length > 0){
            this.router.navigate(['/origin/batch/origincodegen',{batchCodeId:this.searchData.batchCodeId}]);
        }

    }

    goBack(){
        this.location.back();
    }
}
