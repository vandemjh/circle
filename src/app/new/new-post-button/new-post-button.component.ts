import { Component, OnInit, Input } from "@angular/core";
import { NewPostFormComponent } from "../new-post-form/new-post-form.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "circle-new-post-button",
    templateUrl: "./new-post-button.component.html",
    styleUrls: ["./new-post-button.component.css"],
})
export class NewPostButtonComponent implements OnInit {
    @Input() username: string;
    constructor(private dialog: MatDialog) {}
    openDialog(): void {
        console.log("open");
        this.dialog.open(NewPostFormComponent);
    }

    ngOnInit(): void {}
}
