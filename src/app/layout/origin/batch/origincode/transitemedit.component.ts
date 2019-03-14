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

import {CityService} from "../../../../shared/services/common/city.service";

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OriginTransItemService} from "../../../../shared/services/origin/originTransItem.service";

@Component({
    selector: 'app-origin-transitemedit',
    templateUrl: './transitemedit.component.html'
})
export class TransItemEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID

    public entityId='';//当前数据ID
    public entityName='';//当前数据ID

    submitted = false; //控制重复提交

    public cn = Keys.cn;

    public listProvince = [];

    public listCity = [];

    public listRegion = [];

    public imageUrl ='';


    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router, private originTransItemService:OriginTransItemService,private cityService:CityService,public activeModal: NgbActiveModal,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.loadData();
    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            region: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            createDateTime: new FormControl('', Validators.required)
        });


    }

    loadData(){

        this.cityService.findAllRegion().subscribe(res=>{
            if(res.code == 0){
                this.listProvince = res.data;
            }
        });

        if(this.curId){
            this.originTransItemService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'province': res.data.province});
                    this.dataForm.patchValue({'city': res.data.city});
                    this.dataForm.patchValue({'region': res.data.region});
                    this.dataForm.patchValue({'address': res.data.address});

                    this.imageUrl = res.data.imageUrl;

                }
            });
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

        formData.createDateTime = formData.createDateTime + " 10:00:00";

        this.originTransItemService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;
                this.activeModal.close( '');

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
