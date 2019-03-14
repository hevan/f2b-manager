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
import {CorpManageStoreService} from "../../../../shared/services/corp/corpManageStore.service";

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {CorpSelectComponent} from "../../corp/component/corpselect.component";

@Component({
    selector: 'app-merch-group-corp-list',
    templateUrl: './groupcorplist.component.html',
    animations: [routerTransition()]
})
export class GroupCorpListComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public corp:any;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router, private toastrService:ToastrService,private corpManageStoreService: CorpManageStoreService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

        this.loadData();
    }

    loadData() {

        const paramsContract = new HttpParams().set('manageCorpId',this.corp.id);

        this.corpManageStoreService.findAllByManageCorp(paramsContract).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;
            }
        });
    }


    addCorp(){
        const modalRef = this.modalService.open(CorpSelectComponent,{ size: 'lg' });

        modalRef.result.then((result) => {
            if(result){
                let retData = JSON.parse(result);

                let data = {'manageCorpId':this.corp.id,'corpId':retData.id};

                this.corpManageStoreService.save(JSON.stringify(data)).subscribe(res=>{
                    if(res.code == 0){
                        this.loadData();
                    }
                });
            }

        });
    }

    toDelete(corpId){

        let deleteParams = new HttpParams().set('manageCorpId',this.corp.id).set('corpId',corpId);

        this.corpManageStoreService.delete(deleteParams).subscribe(res=>{
            if(res.code == 0){
                this.loadData();
            }
        });
    }


}
