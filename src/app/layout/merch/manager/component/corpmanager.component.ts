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
import {CorpManagerService} from "../../../../shared/services/corp/corpManager.service";
import {CorpDepartService} from "../../../../shared/services/corp/corpDepart.service";
import {CorpRoleService} from "../../../../shared/services/corp/corpRole.service";

@Component({
    selector: 'app-merch-corpmanagerlist',
    templateUrl: './corpmanager.component.html',
    animations: [routerTransition()]
})
export class CorpManagerListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {'mobile':'','realName':''};

    public selectData = {id:'','realName':'', 'mobile':'','departId':'','corpRoleId':'','activeStatus':'',corpId:''};


    public listDepart = [];
    public listCorpRole = [];


    public curSelectId='';

    public corpId;

    public displayEdit = false;

    public submitted = false;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private corpDepartService:CorpDepartService,private corpRoleService:CorpRoleService, private corpManagerService: CorpManagerService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.corpId = this.authService.getCorpInfoId();

        this.loadData();
    }

    loadData() {

        const params = new HttpParams().set('corpId', this.corpId);

        this.corpDepartService.findAllByCorpId(params).subscribe(res=>{
            if(res.code == 0){
                this.listDepart = res.data;
            }
        });

        this.corpRoleService.findAllByCorpId(params).subscribe(res=>{
            if(res.code == 0){
                this.listCorpRole = res.data;
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

        const paramsContract = new HttpParams().set('corpId',this.corpId).set('realName',this.searchData.realName).set('mobile',this.searchData.mobile).set('page',curPage).set('itemsPerPage',this.pageNav.itemsPerPage+'');

        this.corpManagerService.pageQuery(paramsContract).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
                this.pageNav.totalElements = res.totalElements;
                this.pageNav.totalPages = res.totalPages;
            }
        });
    }

    checkItem(item:any){

        if(item.activeStatus === 0){
            item.activeStatus = 1;
        }else{
            item.activeStatus = 0;
        }

        this.curSelectId = item.id;

        const paramsContract = new HttpParams().set('id',item.id).set('activeStatus',item.activeStatus);

        this.corpManagerService.updateStatus(paramsContract).subscribe(res=>{
            if(res.code == 0){
            }
        });

    }

    toView(id){
        this.router.navigate(['/merch/corp/corpview', { 'id': id}]);
    }

    toEdit(item){
        if(item){
            let departId = '';
            let corpRoleId = '';
            if(item.depart){
                departId = item.depart.id;
            }
            if(item.corpRole){
                corpRoleId = item.corpRole.id;
            }

            this.selectData = {id:item.id,'realName':item.realName, 'mobile':item.mobile,'departId':departId,'corpRoleId':corpRoleId,'activeStatus':item.activeStatus,'corpId':item.corpId};


        }else {
            this.selectData = {id:'','realName':'', 'mobile':'','departId':'','corpRoleId':'','activeStatus':'',corpId:''};
        }

        this.displayEdit = true;
    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        let userCenter = { mobile:this.selectData.mobile,registerChannel:'CHANNEL_MERCH'};

        let curCorpManager = {id:this.selectData.id,'realName':this.selectData.realName, 'mobile':this.selectData.mobile,'depart':{id:this.selectData.departId},'corpRole':{id:this.selectData.corpRoleId},'activeStatus':this.selectData.activeStatus,'corpId':this.selectData.corpId};

        this.authService.add(JSON.stringify(userCenter)).subscribe(data=>{
            this.corpManagerService.save(JSON.stringify(curCorpManager)).subscribe(res=>{
                if(res.code == 0){

                }
                //还原button
                this.submitted = false;
                this.displayEdit = false;
                this.paginateQuery(null);
            });
        });

    }


    goBack(){
        this.location.back();
    }
}
