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
import {WarehouseService} from "../../../../shared/services/wms/warehouse.service";

@Component({
    selector: 'app-wms-warehouseedit',
    templateUrl: './warehouseedit.component.html'
})
export class WarehouseEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;
    public corpId;

    submitted = false; //控制重复提交

    public listItem = Keys.wmsTypes;

    public imageUrl;

    public listProvince = [];

    public listCity = [];

    public listType =Keys.wmsTypes;

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private warehouseService: WarehouseService,private cityService:CityService,private authService:AuthService) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {

        this.curId = this.route.snapshot.paramMap.get('id');
        this.corpId = this.authService.getCorpInfoId();

        this.cityService.findAllRegion().subscribe(res=>{
            if(res.code == 0){
                this.listProvince = res.data;
            }
        });

        if(this.curId){
            this.warehouseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'code': res.data.code});

                    this.dataForm.patchValue({'type':res.data.type});


                    this.dataForm.patchValue({'province': res.data.province});
                    this.dataForm.patchValue({'city': res.data.city});
                    this.dataForm.patchValue({'address': res.data.address});

                    this.dataForm.patchValue({'busiScope': res.data.busiScope});
                    this.dataForm.patchValue({'linkMan': res.data.linkMan});
                    this.dataForm.patchValue({'linkTel': res.data.linkTel});
                    this.dataForm.patchValue({'area': res.data.area});
                    this.dataForm.patchValue({'capacity': res.data.capacity});

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

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            area: new FormControl('', Validators.required),
            capacity: new FormControl('', Validators.required),
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
        formData.imageUrl = this.imageUrl;
        formData.corpId  =this.corpId;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.warehouseService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){

        this.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;

    }

    goBack(){
        this.location.back();
    }

}
