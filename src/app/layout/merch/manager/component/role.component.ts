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
import {CorpDepartService} from "../../../../shared/services/corp/corpDepart.service";
import {CorpRoleService} from "../../../../shared/services/corp/corpRole.service";

@Component({
    selector: 'app-merch-corp-role',
    templateUrl: './role.component.html',
    animations: [routerTransition()]
})
export class CorpRoleComponent implements OnInit {

    public listData = []; //定义form

    public selectCorpRole = {'id':'','name':'','corpId':''};

    public display = false;

    public  corpId='';

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private corpRoleService: CorpRoleService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {

        this.corpId = this.authService.getCorpInfoId();

        this.loadData();


    }

    loadData() {

        this.search();
    }

    search() {


        const params = new HttpParams().set('corpId', this.corpId);

        this.corpRoleService.findAllByCorpId(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
            }
        });
    }

    submit(){
        this.selectCorpRole.corpId = this.corpId;

        this.corpRoleService.save(JSON.stringify(this.selectCorpRole)).subscribe(res=>{
            if(res.code == 0){
                this.search();
            }

            this.display = false;
        });
    }

    toEdit(item:any){

        if(item){
            this.selectCorpRole = item;
        }

        this.display = true;
    }

    toDelete(id:any){

        this.corpRoleService.delete(id).subscribe(res=>{
            if(res.code == 0){
                this.search();
            }
        });
    }

    toSet(item:any){
        this.router.navigate(['/merch/manage/rolemenu',{'roleId':item.id, 'roleName':item.name}]);
    }

    goBack(){
        this.location.back();
    }
}
