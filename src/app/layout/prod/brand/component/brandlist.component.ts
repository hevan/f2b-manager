/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import {HttpParams } from '@angular/common/http';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';
import {BrandService} from "../../../../shared/services/prod/brand.service";

@Component({
    selector: 'app-prod-brandlist',
    templateUrl: './brandlist.component.html',
    animations: [routerTransition()]
})
export class BrandListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {'name':''};

    public selectData = {id:'','name':'', 'imageUrl':'','description':'',corpId:''};


    public corpId;

    public displayEdit = false;

    public submitted = false;

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private brandService: BrandService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corpId = this.authService.getCorpInfoId();

        this.loadData();
    }

    loadData() {

        const params = new HttpParams().set('corpId', this.corpId);

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

        const paramsContract = new HttpParams().set('name',this.searchData.name).set('corpId',this.corpId).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.brandService.pageQuery(paramsContract).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }



    toEdit(item){
        if(item){

            this.selectData = item;
        }

        this.displayEdit = true;
    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        this.selectData.corpId = this.corpId;

        this.brandService.save(JSON.stringify(this.selectData)).subscribe(data=>{

            //还原button
            this.submitted = false;
            this.displayEdit = false;
            this.paginateQuery(null);

        });

    }

    onBasicUploadAuto(event){

        this.selectData.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;

    }

    toViewIntro(id){
        this.router.navigate(['/intro/introlist', { 'entityId': id,'entityName':'brand'}]);
    }

    goBack(){
        this.location.back();
    }
}
