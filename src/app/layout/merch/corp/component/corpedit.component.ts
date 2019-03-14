/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {CorpService} from '../../../../shared/services/corp/corp.service';
import {CityService} from '../../../../shared/services/common/city.service';
import { Keys   }    from '../../../../shared/common/keys';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CorpManagerService} from "../../../../shared/services/corp/corpManager.service";

@Component({
    selector: 'app-merch-corpedit',
    templateUrl: './corpedit.component.html'
})
export class CorpEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;

    submitted = false; //控制重复提交

    public listCorpType = [];

    public certImageUrl;

    public listProvince = [];

    public listCity = [];


    //构造
    constructor(public activeModal: NgbActiveModal,private corpService: CorpService,private cityService:CityService,private corpManagerService:CorpManagerService, private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {

        this.corpService.findAllCorpType().subscribe(res=>{
            if(res.code == 0){
                this.listCorpType = res.data;
            }
        });

        this.cityService.findAllRegion().subscribe(res=>{
            if(res.code == 0){
                this.listProvince = res.data;
            }
        });

        let corpData = this.authService.getCorpInfo();
        if(corpData){

            this.curId = corpData.id;
            this.dataForm.patchValue({'name': corpData.name});
            this.dataForm.patchValue({'organizationCode': corpData.organizationCode});
            if(corpData.corpType){
                this.dataForm.patchValue({'corpType': {'id':corpData.corpType.id}});
            }

            this.dataForm.patchValue({'province': corpData.province});
            this.dataForm.patchValue({'city': corpData.city});
            this.dataForm.patchValue({'address': corpData.address});
            this.dataForm.patchValue({'description': corpData.description});
            this.dataForm.patchValue({'busiScope': corpData.busiScope});
            this.dataForm.patchValue({'linkMan': corpData.linkMan});
            this.dataForm.patchValue({'linkTel': corpData.linkTel});
            this.certImageUrl = corpData.certImageUrl;

        }


        this.dataForm.controls['province'].valueChanges
            .subscribe(term => {
               for(var i=0;i<this.listProvince.length;i++){

                   if(term === this.listProvince[i].name){
                       this.listCity = this.listProvince[i].subRegions;
                   }
                }
            });

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            corpType: new FormGroup({
                id: new FormControl('', Validators.required)
            }),
            organizationCode: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            busiScope: new FormControl('', Validators.required),
            linkMan: new FormControl('', Validators.required),
            linkTel: new FormControl('', Validators.required)
        });


    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;
        formData.certImageUrl = this.certImageUrl;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.corpService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

               //localStorage.setItem('corp_id',res.data);
                this.loadCorp(res.data);

            }
            //还原button
            this.submitted = false;
        });
    }


    loadCorp(id){

        this.corpService.find(id).subscribe(res=>{
            if(res.code == 0){
                if(res.data){
                    localStorage.setItem(Keys.KEY_CORP_INFO, JSON.stringify(res.data));
                }

                this.addCurManager(id);
            }
        });
    }

    addCurManager(id){
        let userInfo = this.authService.getUserInfo();
        let userManager = this.authService.getManagerInfo();
        if(null == userManager){
            let userManager = {mobile:userInfo.mobile,realName:userInfo.mobile,activeStatus:1,corpId:id};

            this.corpManagerService.save(JSON.stringify(userManager)).subscribe(data=>{

                this.activeModal.close("success");

            });
        }
    }

    onBasicUploadAuto(event){


        this.certImageUrl = JSON.parse(event.xhr.response).data.imageUrl;

    }

}
