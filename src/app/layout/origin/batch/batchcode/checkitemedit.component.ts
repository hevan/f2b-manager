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


import { ToastrService } from 'ngx-toastr';
import {OriginCheckItemService} from "../../../../shared/services/origin/originCheckItem.service";


import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-origin-checkitemedit',
    templateUrl: './checkitemedit.component.html'
})
export class CheckItemEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID

    public entityId='';//当前数据ID
    public entityName='';//当前数据ID

    public listImage = [];

    submitted = false; //控制重复提交

    public imageUrl ='';

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private originCheckItemService:OriginCheckItemService,public activeModal: NgbActiveModal,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        if(this.curId){
            this.loadData();
        }
    }

    loadData(){
        this.originCheckItemService.find(this.curId).subscribe(res=>{
            if(res.code == 0){

                this.dataForm.patchValue({"checkType":res.data.checkType});
                this.dataForm.patchValue({"description":res.data.description});

                this.listImage = res.data.listImage;
            }
        });
    }
    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            checkType:new FormControl('', Validators.required),
            description:new FormControl('', Validators.required),
        });


    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;

        formData.imageUrls = this.listImage.join(',');

        formData.entityId  =this.entityId;
        formData.entityName  =this.entityName;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.originCheckItemService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;

                this.activeModal.close( '');

            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){
        let imageUrl = JSON.parse(event.xhr.response).data.imageUrl;

        this.listImage.push(imageUrl);
    }

    deleteImage(index){
        this.listImage.slice(index,1);
    }

    closeDialog(){

        console.log(' length 0');
        this.activeModal.close( '');

    }

}
