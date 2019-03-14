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
import {SpecialProductService} from "../../../../shared/services/prod/specialProduct.service";


import {ProductMediaService} from "../../../../shared/services/prod/productMedia.service";

import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js'

@Component({
    selector: 'app-prod-specialedit',
    templateUrl: './specialedit.component.html',
    animations: [routerTransition()]
})
export class SpecialProductEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corpId;

    submitted = false; //控制重复提交

    public listCategory = [];

    public imageUrl ='';
    public detailImageUrl = '';


    public ckeditorContent = '';



    public showFiles = false;

    public Editor = ClassicEditor;

    public custConfig = {
        ckfinder:{
            uploadUrl: 'http://api.yoxyc.com/auth/v2/open/file/uploadImage'
        },
        language: 'zh-cn'
    };

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private specialProductService: SpecialProductService,private categoryService:CategoryService,private productMediaService:ProductMediaService,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corpId = this.authService.getCorpInfoId();

        this.categoryService.findAll().subscribe(res=>{
            if(res.code == 0){
                this.listCategory = res.data;
            }
        });


        if(this.curId){
            this.specialProductService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'code': res.data.code});
                    if(res.data.category){
                        this.dataForm.patchValue({'category': {'id':res.data.category.id}});
                    }

                    this.dataForm.patchValue({'tag': res.data.tag});

                    this.dataForm.patchValue({'startMoney': res.data.startMoney});
                    this.dataForm.patchValue({'endMoney': res.data.endMoney});

                    this.dataForm.patchValue({'videoUrl': res.data.videoUrl});

                    this.dataForm.patchValue({'description': res.data.description});
                    this.imageUrl = res.data.imageUrl;

                    this.ckeditorContent = res.data.content;
                }

            });

        }

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
            category: new FormGroup({
                id: new FormControl('', Validators.required)
            }),

            tag: new FormControl('', Validators.required),
            startMoney: new FormControl('', Validators.required),
            endMoney: new FormControl('', Validators.required),
            videoUrl: new FormControl('', Validators.required),

            description: new FormControl('', Validators.required)
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
        formData.brand = {'id':formData.brand};

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.specialProductService.save(JSON.stringify(formData)).subscribe(res=>{
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

        let productMedia = {id:'', productId:this.curId,'imageUrl':imageUrl,'sortNum':1};
        this.productMediaService.save(JSON.stringify(productMedia)).subscribe(res=>{
           if(res.code == 0){
               productMedia.id = res.data;

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
