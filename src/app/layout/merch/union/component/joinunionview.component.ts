/**
 * Created by hevan on 2018/6/4.
 */
/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {GroupUnionService} from '../../../../shared/services/corp/groupUnion.service';
import { Keys   }    from '../../../../shared/common/keys';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CorpSelectComponent} from '../../corp/component/corpselect.component';


@Component({
    selector: 'app-merch-union-joinunionview',
    templateUrl: './joinunionview.component.html',
    animations: [routerTransition()]
})
export class JoinUnionViewComponent implements OnInit {

    public unionData:any;
    public corp:any;

    public curId;


    public listCorp=[];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private groupUnionService: GroupUnionService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();
        this.loadData();

        this.loadCorp();
    }

    loadData(){

        this.groupUnionService.find(this.curId).subscribe(res=>{
           if(res.code ==0){
               this.unionData = res.data;
           }
        });
    }

    selectCorp(){
        const modalRef = this.modalService.open(CorpSelectComponent,{ size: 'lg' });

        modalRef.result.then((result) => {
            if(result){
                let retData = JSON.parse(result);

                let addCorpParams = new HttpParams().set('corpId',this.corp.id).set('groupUnionId',this.curId);

                this.groupUnionService.addCorp(addCorpParams).subscribe(res=>{
                    if(res.code == 0){
                      this.loadCorp();
                    }
                });
            }

        });
    }

    loadCorp(){
        let queryParams = new HttpParams().set('groupUnionId',this.curId);

        this.groupUnionService.findAllCorpByUnionId(queryParams).subscribe(res=>{
            if(res.code == 0){
              this.listCorp = res.data;
            }
        });
    }

    //编辑
    toEdit(id){
        this.router.navigate(['/merch/union/groupunioneidt', { 'id': id}]);
    }

    toDeleteCorp(corpId){
        let addCorpParams = new HttpParams().set('corpId',corpId).set('groupUnionId',this.curId);

        this.groupUnionService.deleteCorp(addCorpParams).subscribe(res=>{
            if(res.code == 0){
                this.loadCorp();
            }
        });
    }

    goBack(){
        this.location.back();
    }
}
