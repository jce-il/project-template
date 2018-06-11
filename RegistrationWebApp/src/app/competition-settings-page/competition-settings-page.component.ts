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
      this.comp_settings = this.db.competition_settings_db[0];
    })
  }
/**
 * Closes competition by entering default values to the comp_settings object
 * at the end of operations it updates the DB
 */
  closeCompetition() {
    if (window.confirm('האם לסגור תחרות נוכחית?')) {
      this.comp_settings.is_opened = false;
      this.comp_settings.name = 'אין תחרות פתוחה';
      this.comp_settings.start_date = 'NaN';
      this.comp_settings.end_date = 'NaN';
      this.db.competition_settings = this.comp_settings;
      this.db.updateSettingsListing();
      this.comp_settings = new CompetitionSettings();
    }
  }
/**
 * Opens competition by collecting entered values from manager to the comp_settings object
 * at the end of operations it updates the DB
 */
  openCompetition() {
    this.comp_settings.is_opened = true;
    this.db.competition_settings = this.comp_settings;
    this.db.updateSettingsListing()
    alert("התחרות נפתחה בהצלחה!")
  }

}
