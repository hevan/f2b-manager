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
import {BrandService} from "../../../../shared/services/prod/brand.service";
import {CategoryService} from '../../../../shared/services/prod/category.service';
import { Keys   }    from '../../../../shared/common/keys';
import {ProductService} from "../../../../shared/services/prod/product.service";

import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {CityService} from "../../../../shared/services/common/city.service";

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-origin-mediaitemedit',
    templateUrl: './mediaitemedit.component.html'
})
export class MediaItemEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID

    public entityId='';//当前数据ID
    public entityName='';//当前数据ID

    submitted = false; //控制重复提交

    public imageUrl ='';


    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private plantBaseService: PlantBaseService,private originContentItemService:OriginContentItemService,private originMediaItemService:OriginMediaItemService,private cityService:CityService,public activeModal: NgbActiveModal,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.loadMedia();
    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            mediaType: new FormControl('', Validators.required),
            mediaUrl: new FormControl('', Validators.required)
        });


    }

    loadMedia(){

        if(this.curId){
            this.originMediaItemService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'mediaType': res.data.mediaType});
                    this.dataForm.patchValue({'mediaUrl': res.data.mediaUrl});

                    this.imageUrl = res.data.imageUrl;
                }
            });
        }

    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;
        formData.imageUrl = this.imageUrl;

        formData.entityId  =this.entityId;
        formData.entityName  =this.entityName;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.originMediaItemService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;
            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){
        this.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;
    }


    closeDialog(){

        console.log(' length 0');
        this.activeModal.close( '');

    }

}
