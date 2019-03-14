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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js'

import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {CityService} from "../../../../shared/services/common/city.service";


import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentItemEditComponent} from "./contentitemedit.component";
import {MediaItemEditComponent} from "./mediaitemedit.component";

@Component({
    selector: 'app-origin-plantedit',
    templateUrl: './plantedit.component.html',
    animations: [routerTransition()]
})
export class PlantEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corp;

    submitted = false; //控制重复提交

    public imageUrl ='';
    public detailImageUrl = '';

    public listProvince = [];

    public listCity = [];

    public listRegion = [];

    public ckeditorContent = '';


    public listMediaItem = [];

    public listContentItem = [];


    public showFiles = false;

    public Editor = ClassicEditor;

    public custConfig = {
        ckfinder:{
            uploadUrl: 'http://api.yoxyc.com/auth/v2/open/file/uploadImage'
        },
        language: 'zh-cn'
    };

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private plantBaseService: PlantBaseService,private originContentItemService:OriginContentItemService,private originMediaItemService:OriginMediaItemService,private cityService:CityService,private authService:AuthService,private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();

        this.cityService.findAllRegion().subscribe(res=>{
            if(res.code == 0){
                this.listProvince = res.data;
            }
        });


        if(this.curId){
            this.plantBaseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.dataForm.patchValue({'name': res.data.name});

                    this.dataForm.patchValue({'province': res.data.province});
                    this.dataForm.patchValue({'city': res.data.city});
                    this.dataForm.patchValue({'region': res.data.region});
                    this.dataForm.patchValue({'address': res.data.address});

                    this.imageUrl = res.data.imageUrl;

                    this.ckeditorContent = res.data.content;
                }

            });

            this.loadMedia();
            this.loadContent();

        }


        this.dataForm.controls['province'].valueChanges
            .subscribe(term => {
                for(var i=0;i<this.listProvince.length;i++){

                    if(term === this.listProvince[i].name){
                        this.listCity = this.listProvince[i].subRegions;
                    }
                }
            });


        this.dataForm.controls['city'].valueChanges
            .subscribe(term => {
                for(var i=0;i<this.listCity.length;i++){

                    if(term === this.listCity[i].name){
                        this.listRegion = this.listCity[i].subRegions;
                    }
                }
            });

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),

            province: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            region: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required)
        });


    }

    loadMedia(){
        let paramsMedia = new HttpParams().set('entityId',this.curId).set('entityName','plantBase');

        this.originMediaItemService.findAllByEntity(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listMediaItem = res.data;
            }
        });
    }

    loadContent(){
        let params = new HttpParams().set('entityId',this.curId).set('entityName','plantBase');

        this.originContentItemService.findAllByEntity(params).subscribe(res=>{
            if(res.code == 0){
                this.listContentItem = res.data;
            }
        });
    }

    addContentItem(){
        const modalRef = this.modalService.open(ContentItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'plantBase';
        modalRef.result.then((result) => {
            this.loadContent();
        });
    }

    deleteContentItem(id){

        console.log('----' + id);

        this.originContentItemService.delete(id);

        this.loadContent();
    }

    deleteMediaItem(id){

       this.originMediaItemService.delete(id);
        this.loadMedia();

    }

    addMediaItem(){
        const modalRef = this.modalService.open(MediaItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'plantBase';
        modalRef.result.then((result) => {
            this.loadMedia();
        });
    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;
        formData.imageUrl = this.imageUrl;
        formData.content = this.ckeditorContent;

        formData.corpId  =this.corp.id;
        formData.corpName  =this.corp.name;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.plantBaseService.save(JSON.stringify(formData)).subscribe(res=>{
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

    onBasicUploadAutoEx(event){

        if(!this.curId){
            this.onSubmit();
        }

        let imageUrl = JSON.parse(event.xhr.response).data.imageUrl;

        let productMedia = {id:'', entityId:this.curId,entityName:'plantBase','imageUrl':imageUrl};
        this.originMediaItemService.save(JSON.stringify(productMedia)).subscribe(res=>{
           if(res.code == 0){
               productMedia.id = res.data;
               this.loadMedia();
           }

        });
    }

    openImageExplorer($event: any) {
        this.showFiles = true; // open pop-up window
    }

    onCloseImage() {
        this.showFiles = false; // close the pop-up window
    }


    onCkeditorUpload(event){
        this.detailImageUrl = JSON.parse(event.xhr.response).data.imageUrl;

        try
        {
            this.ckeditorContent = this.ckeditorContent  + "<img src='"+this.detailImageUrl+"'>";
        }
        catch(error)
        {
            console.log((<Error>error).message);
        }

        this.showFiles = false; // close the pop-up window

    }

    goBack(){
        this.location.back();
    }

}
