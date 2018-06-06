import { Component, OnInit } from '@angular/core';
import { CompetitionSettings } from '../competition-settings'
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-competition-settings-page',
  templateUrl: './competition-settings-page.component.html',
  styleUrls: ['./competition-settings-page.component.css']
})
export class CompetitionSettingsPageComponent implements OnInit {
  comp_settings: CompetitionSettings;
  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getSettingsMetaData().subscribe((res) => {
      this.db.competition_settings_db = res;
      this.comp_settings = this.db.competition_settings_db[0] ;
    })
    //this.comp_settings = new CompetitionSettings();
  }

  setSettings() {
    this.comp_settings.is_opened = true;
    this.db.competition_settings = this.comp_settings;
    this.db.updateSettingsListing()
    alert("הפרוייקט נפתח בהצלחה!")
  }

}
