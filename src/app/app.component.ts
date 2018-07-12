import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private swUpdate: SwUpdate) {}
  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.checkForUpdates();
    }
  }

  async checkForUpdates() {
    this.swUpdate.available.subscribe(evt => {
      console.log('service worker updated');
    });

    try {
      await this.swUpdate.checkForUpdate();
    } catch (err) {
      console.error('error when checking for update', err);
    }
  }
}
