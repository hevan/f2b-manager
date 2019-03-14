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

import { ToastrService } from 'ngx-toastr';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';

import {ProductMediaService} from "../../../../shared/services/prod/productMedia.service";
import {ProductSkuService} from "../../../../shared/services/prod/productSku.service";
import {ProductWholesaleService} from "../../../../shared/services/prod/productWholesale.service";

@Component({
    selector: 'app-prod-productedit',
    templateUrl: './productedit.component.html',
    animations: [routerTransition()]
})
export class ProductEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corpId;

    submitted = false; //控制重复提交

    public listCategory = [];

    public imageUrl ='';
    public detailImageUrl = '';

    public listBrand = [];

    public ckeditorContent = '';


    public listMedia = [];

    public listSku = [];

    public listWholesale = [];

    public showFiles = false;

    public  Editor = ClassicEditor;

    public custConfig = {
        ckfinder:{
            uploadUrl: 'http://api.yoxyc.com/auth/v2/open/file/uploadImage'
        },
        language: 'zh-cn'
    };

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private productService: ProductService,private brandService:BrandService,private categoryService:CategoryService,private toastrService:ToastrService,private authService:AuthService) {
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

        //let params = new HttpParams().set('corpId', this.corpId);

        this.brandService.findAll().subscribe(res=>{
            if(res.code == 0){
                this.listBrand = res.data;
            }
        });

        if(this.curId){
            this.productService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'code': res.data.code});
                    if(res.data.category){
                        this.dataForm.patchValue({'category': {'id':res.data.category.id}});
                    }
                    if(res.data.brand) {
                        this.dataForm.patchValue({'brand': {'id':res.data.brand.id}});
                    }
                    this.dataForm.patchValue({'originPlace': res.data.originPlace});

                    this.dataForm.patchValue({'spec': res.data.spec});
                    this.dataForm.patchValue({'tag': res.data.tag});

                    this.dataForm.patchValue({'productType': res.data.productType});
                    this.dataForm.patchValue({'bookingType': res.data.bookingType});
                    this.dataForm.patchValue({'year': res.data.year});
                    this.dataForm.patchValue({'videoUrl': res.data.videoUrl});

                    this.dataForm.patchValue({'incomeRate': res.data.incomeRate});
                    this.dataForm.patchValue({'stock': res.data.stock});
                    this.dataForm.patchValue({'sortNum': res.data.sortNum});

                    this.dataForm.patchValue({'saledCount': res.data.saledCount});
                    this.dataForm.patchValue({'publishDate': res.data.publishDate});
                    this.dataForm.patchValue({'price': res.data.price});
                    this.dataForm.patchValue({'marketPrice': res.data.marketPrice});
                    this.dataForm.patchValue({'calcUnit': res.data.calcUnit});
                    this.dataForm.patchValue({'startDate': res.data.startDate});
                    this.dataForm.patchValue({'endDate': res.data.endDate});
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
            brand: new FormGroup({
                id: new FormControl('', Validators.required)
            }),
            originPlace: new FormControl('', Validators.required),
            spec: new FormControl('', Validators.required),
            tag: new FormControl('', Validators.required),
            incomeRate: new FormControl(''),
            calcUnit: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            marketPrice: new FormControl('', Validators.required),
            stock: new FormControl('', Validators.required),
            sortNum: new FormControl('', Validators.required),
            saledCount: new FormControl('', Validators.required),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required),
            publishDate: new FormControl('', Validators.required),
            productType: new FormControl('', Validators.required),
            bookingType: new FormControl('', Validators.required),
            year: new FormControl('', Validators.required),
            videoUrl: new FormControl('', Validators.required),

            description: new FormControl('', Validators.required)
        });


    }

    get f() { return this.dataForm.controls; }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;
        formData.imageUrl = this.imageUrl;
        formData.content = this.ckeditorContent;
        formData.corpId  =this.corpId;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.productService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

                this.toastrService.success("保存成功");

              this.curId = res.data;

                this.router.navigate(['/prod/product/productview', { 'id': res.data}]);

            }else{
                this.toastrService.error("失败 "+res.message);
            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){
        this.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;
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
