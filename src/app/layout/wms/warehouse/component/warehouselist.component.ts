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
import {CorpService} from '../../../../shared/services/corp/corp.service';
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';
import {WarehouseService} from "../../../../shared/services/wms/warehouse.service";

@Component({
    selector: 'app-wms-warehouselist',
    templateUrl: './warehouselist.component.html',
    animations: [routerTransition()]
})
export class WarehouseListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {type:'','city':'','name':''};

    public listType = Keys.wmsTypes;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private warehouseService: WarehouseService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {

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

        const paramsContract = new HttpParams().set('type', this.searchData.type).set('name',this.searchData.name).set('city',this.searchData.city).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.warehouseService.pageQuery(paramsContract).subscribe(res=>{
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
        this.router.navigate(['/wms/warehouse/warehouseview', { 'id': id}]);
    }

    toEdit(id){
        this.router.navigate(['/wms/warehouse/warehouseedit', { 'id': id}]);
    }

    goBack(){
        this.location.back();
    }
}
