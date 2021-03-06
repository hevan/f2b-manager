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

import {SupplyMaterielService} from "../../../../shared/services/origin/supplyMateriel.service";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-origin-batchmaterial-edit',
    templateUrl: './batchmaterieledit.component.html'
})
export class BatchMaterielEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public batchCodeId;//当前数据ID
    public corp;

    submitted = false; //控制重复提交

    public imageUrl='';

    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private supplyMaterielService: SupplyMaterielService,private authService:AuthService,private activeModule:NgbActiveModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.batchCodeId = this.route.snapshot.paramMap.get('batchCodeId');
        this.corp = this.authService.getCorpInfo();


        if(this.curId){
            this.supplyMaterielService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'materielType': res.data.materielType});
                    this.dataForm.patchValue({'productName': res.data.productName});
                    this.dataForm.patchValue({'productCode': res.data.productCode});
                    this.dataForm.patchValue({'supplyCorpName': res.data.supplyCorpName});
                    this.dataForm.patchValue({'puchQty': res.data.puchQty});
                    this.dataForm.patchValue({'puchUnit': res.data.puchUnit});
                    this.dataForm.patchValue({'puchUser': res.data.puchUser});
                    this.dataForm.patchValue({'checkUser': res.data.checkUser});
                    this.dataForm.patchValue({'puchDate': res.data.puchDate});

                    this.imageUrl = res.data.imageUrl;
                    this.batchCodeId = res.data.batchCodeId;
                }

            });
        }

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            materielType: new FormControl('', Validators.required),
            productName: new FormControl('', Validators.required),
            productCode: new FormControl('', Validators.required),
            supplyCorpName: new FormControl('', Validators.required),
            puchQty: new FormControl('', Validators.required),
            puchUnit: new FormControl('', Validators.required),
            puchUser: new FormControl('', Validators.required),
            checkUser: new FormControl('', Validators.required),
            puchDate: new FormControl('', Validators.required),
        });

    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;

        formData.imageUrl  =this.imageUrl;

        formData.corpId  =this.corp.id;
        formData.batchCodeId  =this.batchCodeId;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.supplyMaterielService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.closeDialog();
            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){
        this.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;
    }

    closeDialog(){
        this.activeModule.close("");
    }

}
