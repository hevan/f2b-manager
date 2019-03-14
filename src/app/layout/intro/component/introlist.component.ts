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

import {IntroDocService} from "../../../shared/services/cms/introDoc.service";

@Component({
    selector: 'app-cms-introlist',
    templateUrl: './introlist.component.html'
})
export class IntroListComponent implements OnInit {

    @Input()
    public entityId = '';

    @Input()
    public entityName='';

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public listBlogCategory = [];


    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private introDocService:IntroDocService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.entityId = this.route.snapshot.paramMap.get('entityId');
        this.entityName = this.route.snapshot.paramMap.get('entityName');

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

        const params = new HttpParams().set('entityid', this.entityId).set('entityName',this.entityName).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.introDocService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }

    toDelete(id){
        this.introDocService.delete(id).subscribe(res=>{
           if(res.code == 0){
               this.paginateQuery(null);
           }
        });
    }

    toView(id){
        this.router.navigate(['/intro/introview', { 'id': id}]);
    }

    toEdit(id){
        this.router.navigate(['/intro/introedit', { 'id': id,'entityId':this.entityId,'entityName':this.entityName}]);
    }

    goBack(){
        this.location.back();
    }
}
