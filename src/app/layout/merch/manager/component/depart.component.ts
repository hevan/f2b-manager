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

@Component({
    selector: 'app-merch-corpdepart',
    templateUrl: './depart.component.html',
    animations: [routerTransition()]
})
export class CorpDepartComponent implements OnInit {

    public listData = []; //定义form

    public selectDepart={id:'',name:'',corpId:''};

    public display = false;

    public  corpId='';

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private corpDepartService: CorpDepartService,private authService:AuthService) {

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

        this.corpDepartService.findAllByCorpId(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
            }
        });
    }

    submit(){
        this.selectDepart.corpId = this.corpId;

        this.corpDepartService.save(JSON.stringify(this.selectDepart)).subscribe(res=>{
            if(res.code == 0){
                this.search();
            }

            this.display = false;
        });
    }

    toEdit(item:any){
        if(item){
            this.selectDepart = item;
        }

        this.display = true;
    }

    toDelete(id:any){

        this.corpDepartService.delete(id).subscribe(res=>{
            if(res.code == 0){
                this.search();
            }
        });
    }

    goBack(){
        this.location.back();
    }
}
