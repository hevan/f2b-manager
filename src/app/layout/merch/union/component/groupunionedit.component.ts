/**
 * Created by hevan on 2018/6/4.
 */
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys   }    from '../../../../shared/common/keys';

import {GroupUnionService} from "../../../../shared/services/corp/groupUnion.service";

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-merch-union-groupunionedit',
    templateUrl: './groupunionedit.component.html',
    animations: [routerTransition()]
})
export class GroupUnionEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corp;

    submitted = false; //控制重复提交

    public imageUrl = [];


    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private groupUnionService:GroupUnionService,private toastrService:ToastrService,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();


        if(this.curId){
            this.groupUnionService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'description': res.data.description});
                    this.imageUrl = res.data.imageUrl;
                }

            });
        }

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;

        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;
        formData.corpId  =this.corp.id;
        formData.imageUrl  =this.imageUrl;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.groupUnionService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;

              this.toastrService.success('保存成功');

              this.toView(this.curId);
            }
            //还原button
            this.submitted = false;
        });
    }

    goBack(){
        this.location.back();
    }

    toView(id){
        this.router.navigate(['/merch/union/groupunionview', { 'id': id}]);
    }

    onBasicUploadAuto(event){
        this.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;
    }

}
