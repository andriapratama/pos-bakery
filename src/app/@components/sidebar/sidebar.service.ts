import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public isShowSidebar: boolean = false;
  constructor() {}

  public onShow(): void {
    this.isShowSidebar = !this.isShowSidebar;
  }
}
