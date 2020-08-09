import { Component, OnInit } from "@angular/core";

@Component({
    selector: "circle-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
    sidenavOpen: boolean = false;
    constructor() {}

    ngOnInit(): void {
        console.log()
    }
    toggleSidenav(): void {
        this.sidenavOpen = !this.sidenavOpen;
    }
}
