import { Component, OnInit, Input } from "@angular/core";
import { NewPostFormComponent } from "../new-post-form/new-post-form.component";
import { MatDialog } from "@angular/material/dialog";
import { User } from 'src/app/models/user/user';

@Component({
    selector: "circle-new-post-button",
    templateUrl: "./new-post-button.component.html",
    styleUrls: ["./new-post-button.component.css"],
})
export class NewPostButtonComponent implements OnInit {
    @Input() user: User;
    constructor(private dialog: MatDialog) {}
    openDialog(): void {
        this.dialog.open(NewPostFormComponent).componentInstance.user = this.user;
    }

    ngOnInit(): void {}
}
