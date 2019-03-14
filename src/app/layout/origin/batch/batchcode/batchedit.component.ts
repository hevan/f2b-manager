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


import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {CityService} from "../../../../shared/services/common/city.service";


import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentItemEditComponent} from "../../plant/component/contentitemedit.component";
import {MediaItemEditComponent} from "../../plant/component/mediaitemedit.component";
import {BatchCodeService} from "../../../../shared/services/origin/batchCode.service";
import {PlantSelectComponent} from "../../plant/component/plantselect.component";
import {CommoditySelectComponent} from "../commodity/commodityselect.component";

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-origin-batchedit',
    templateUrl: './batchedit.component.html',
    animations: [routerTransition()]
})
export class BatchEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corp;

    submitted = false; //控制重复提交

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private batchCodeService: BatchCodeService,private originContentItemService:OriginContentItemService,private originMediaItemService:OriginMediaItemService,private authService:AuthService,private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();


        if(this.curId){
            this.batchCodeService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'commodityCode': res.data.commodityCode});
                    this.dataForm.patchValue({'commodityName': res.data.commodityName});
                    this.dataForm.patchValue({'batchCode': res.data.batchCode});
                    this.dataForm.patchValue({'plantBaseId': res.data.plantBaseId});
                    this.dataForm.patchValue({'plantBaseName': res.data.plantBaseName});
                }

            });
        }

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            commodityCode: new FormControl('', Validators.required),
            commodityName: new FormControl('', Validators.required),
            batchCode: new FormControl('', Validators.required),
            plantBaseId: new FormControl('', Validators.required),
            plantBaseName: new FormControl('', Validators.required)
        });


    }


    selectCommodity(){
        const modalRef = this.modalService.open(CommoditySelectComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'batchCode';
        modalRef.result.then((result) => {
            if(result){
                let retData = JSON.parse(result);

                console.log('-----'+result)
                this.dataForm.patchValue({'commodityCode': retData.commodityCode});
                this.dataForm.patchValue({'commodityName': retData.name});

            }
        });
    }

    selectPlant(){
        const modalRef = this.modalService.open(PlantSelectComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'batchCode';
        modalRef.result.then((result) => {
           if(result){
               let retData = JSON.parse(result);

               console.log('-----'+result)
               this.dataForm.patchValue({'plantBaseId': retData.id});
               this.dataForm.patchValue({'plantBaseName': retData.name});

           }

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
        formData.corpName  =this.corp.name;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.batchCodeService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;
            }
            //还原button
            this.submitted = false;
        });
    }

    goBack(){
        this.location.back();
    }

}
