/**
 * Created by hevan on 2017/07/1.
 * 用于ng2-pagenation 的分页组件模型
 */

export class PageDataModel {
  public page:number = 0;
  public itemsPerPage:number = 40;
  public maxSize:number = 5;
  public totalPages:number = 0;
  public totalElements:number = 0;

  public constructor(data: any = {}) {
    this.page = data.page || 0;
    this.itemsPerPage = data.itemsPerPage || 40;
    this.maxSize = data.maxSize || 5;
    this.totalPages = data.totalPages || 0;
    this.totalElements = data.totalElements || 0;
  }
}
