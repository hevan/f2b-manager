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

import {GroupDistributService} from "../../../../shared/services/corp/groupDistribut.service";


@Component({
    selector: 'app-order-tuan-distribut-list',
    templateUrl: './distributlist.component.html',
    animations: [routerTransition()]
})
export class TuanDistributListComponent implements OnInit {

    public corp:any;

    public pageNav = new PageDataModel();

    public listData = [];
    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private groupDistributService:GroupDistributService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

        this.loadData();
    }


    loadData(){
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

        const params = new HttpParams().set('manageCorpId', this.corp.id).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.groupDistributService.pageQuery(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }

        });
    }

    toView(id){
        this.router.navigate(['/order/tuan/distributview', { 'id': id}]);
    }

}
