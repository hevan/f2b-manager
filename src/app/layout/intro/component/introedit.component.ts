/**
 * Created by hevan on 2018/6/4.
 */
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import {AuthService} from '../../../shared/services/user/auth.service';
import { Keys   }    from '../../../shared/common/keys';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ToastrService} from 'ngx-toastr';

import {IntroDocService} from "../../../shared/services/cms/introDoc.service";
import * as moment from 'moment';



@Component({
    selector: 'app-cms-introedit',
    templateUrl: './introedit.component.html',
    animations: [routerTransition()]
})
export class IntroEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID

    public entityId;//当前数据ID
    public entityName;//当前数据ID

    submitted = false; //控制重复提交

    public imageUrl ='';

    public listImages =[];

    public detailImageUrl = '';

    public ckeditorContent = '';


    public cn = Keys.cn;

    public showFiles = false;

    public Editor = ClassicEditor;

    public custConfig = {
        ckfinder:{
            uploadUrl: 'http://api.yoxyc.com/auth/v2/open/file/uploadImage'
        },
        language: 'zh-cn'
    };

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private introDocService: IntroDocService,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.entityId = this.route.snapshot.paramMap.get('entityId');
        this.entityName = this.route.snapshot.paramMap.get('entityName');


        if(this.curId){
            this.introDocService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.dataForm.patchValue({'title': res.data.title});
                    this.dataForm.patchValue({'author': res.data.author});

                    this.entityId = res.data.entityId;
                    this.entityName = res.data.entityName;

                    this.dataForm.patchValue({'showMulti': res.data.showMulti});
                    this.dataForm.patchValue({'tag': res.data.tag});

                    this.dataForm.patchValue({'publishDate': res.data.publishDate});

                    this.dataForm.patchValue({'mediaType': res.data.mediaType});
                    this.dataForm.patchValue({'mediaUrl': res.data.mediaUrl});
                    this.dataForm.patchValue({'status': res.data.status});

                    this.dataForm.patchValue({'description': res.data.description});
                    this.listImages = res.data.listImages;

                    this.ckeditorContent = res.data.content;
                }
            });

        }

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            title: new FormControl('', Validators.required),
            author: new FormControl('', Validators.required),

            showMulti: new FormControl('', Validators.required),
            tag: new FormControl('', Validators.required),
            publishDate: new FormControl('', Validators.required),

            mediaType: new FormControl('', Validators.required),
            mediaUrl: new FormControl('', Validators.required),
            status: new FormControl('', Validators.required),

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

        let imageList = '';
        if(this.listImages && this.listImages.length >0){
            for(var m=0;m<this.listImages.length;m++){
                imageList = this.listImages[m] + ",";
            }
        }

        formData.imageUrls = imageList;

        formData.content = this.ckeditorContent;

        formData.entityId = this.entityId;
        formData.entityName = this.entityName;

        formData.publishDate = moment(formData.publishData).format('YYYY-MM-DD').toLocaleString();

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.introDocService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;
            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){
        let imageUrl = JSON.parse(event.xhr.response).data.imageUrl;

        this.listImages.push(imageUrl);
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
