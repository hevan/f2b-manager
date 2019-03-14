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

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SpecialProductService} from "../../../../shared/services/prod/specialProduct.service";

@Component({
    selector: 'app-prod-specialselect',
    templateUrl: './specialselect.component.html'
})
export class SpecialSelectComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {'code':'','name':''};

    public selectSpecial:any;

    public corpId='';

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private specialProductService:SpecialProductService,private authService:AuthService,private activeModal:NgbActiveModal) {

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

        const params = new HttpParams().set('name',this.searchData.name).set('code',this.searchData.code).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.specialProductService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }

    goBack(){
        this.location.back();
    }

    closeDialog(){

        if (this.selectSpecial) {
            this.activeModal.close( JSON.stringify(this.selectSpecial));
        }else{
            console.log(' length 0');
            this.activeModal.close( '');
        }
    }
}
