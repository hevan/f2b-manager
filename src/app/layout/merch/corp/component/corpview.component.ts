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
import {AuthService} from '../../../../shared/services/user/auth.service';
import {CorpService} from '../../../../shared/services/corp/corp.service';
import { Keys   }    from '../../../../shared/common/keys';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CorpEditComponent} from "./corpedit.component";

@Component({
    selector: 'app-merch-corpview',
    templateUrl: './corpview.component.html',
    animations: [routerTransition()]
})
export class CorpViewComponent implements OnInit {

    public corpData:any;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private corpService: CorpService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {

        this.loadData();
    }

    loadData(){
        this.corpData = this.authService.getCorpInfo();
    }


    //编辑
    toEdit(){
        this.modalService.open(CorpEditComponent,{ size: 'lg' });
    }

    goBack(){
        this.location.back();
    }
}
